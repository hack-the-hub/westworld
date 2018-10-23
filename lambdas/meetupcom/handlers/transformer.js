"use strict";

const path = require("path");
const striptags = require("striptags");
const { getFromS3, getListFromS3 } = require("aws-lambda-data-utils");
const { validate } = require("jsonschema");
const eventSchema = require("./schemas/event-schema");
const { buckets } = require("../config");
const { uploadTo } = require("../utils");

const meetupGroupsFilePrefix = "meetupcom-groups__";
const meetupGroupsDirectory = "groups-events";

const getDescriptionFrom = function({
  plain_text_no_images_description: strippedDescription,
  description
}) {
  if (strippedDescription) return strippedDescription;
  return striptags(striptags(description, ["p", "div"]), [], "\n").trim();
};

const getChargeFrom = function({ fee }) {
  if (!fee) return { is_free: true };

  return {
    is_free: false,
    cost: {
      currency: fee.currency.trim(),
      value: fee.amount
    }
  };
};

const getVenueFrom = function({ venue, group }, defaults) {
  if (!venue) {
    return {
      name: "No Venue",
      latitude: `${group.lat}`.trim(),
      longitude: `${group.lon}`.trim(),
      address: defaults.localized_location.trim(),
      city: defaults.city.trim(),
      country: defaults.country.trim().toUpperCase()
    };
  }

  return {
    name: venue.name.trim(),
    latitude: `${venue.lat}`.trim(),
    longitude: `${venue.lon}`.trim(),
    address: venue.address_1.trim(),
    city: venue.city.trim(),
    country: venue.country.trim().toUpperCase()
  };
};

const getLogoFrom = function({
  group_photo: groupPhoto,
  key_photo: keyPhoto,
  meta_category: metaCategory
}) {
  const imageSet = groupPhoto || keyPhoto || (metaCategory || {}).photo;

  if (!imageSet) {
    return {
      regular:
        "https://secure.meetupstatic.com/s/img/3825254008927924706/logo/svg/logo--mSwarm.svg"
    };
  }

  return {
    high: imageSet.highres_link,
    regular: imageSet.photo_link,
    thumbnail: imageSet.thumb_link
  };
};

const transformEvent = function(defaults, event, group) {
  const {
    id,
    name,
    link: url,
    time,
    duration: meetupDuration,
    group: organiser,
    rsvp_limit: capacity,
    yes_rsvp_count: responses,
    waitlist_count: waitlist,
    created,
    updated
  } = event;

  const duration = meetupDuration || 0;
  const start = new Date(time);
  const end = new Date(time + duration);

  return {
    name: name.trim(),
    description: getDescriptionFrom(event),
    url,
    times: {
      start: {
        utc: start.toISOString(),
        timezone: group.timezone.trim()
      },
      end: {
        utc: end.toISOString(),
        timezone: group.timezone.trim()
      },
      duration
    },
    topics: group.topics.map(topic => topic.name),
    venue: getVenueFrom(event, group),
    organiser: {
      name: organiser.name.trim(),
      logo: getLogoFrom(group)
    },
    attendee_numbers: {
      capacity,
      responses,
      waitlist
    },
    charge: getChargeFrom(event),
    created_at: new Date(created).toISOString(),
    last_updated: new Date(updated).toISOString(),
    source_data: {
      name: "meetupcom",
      id
    }
  };
};

const isUpcomingEvent = ({ status }) => status === "upcoming";

const isValidEvent = event => validate(event, eventSchema).errors.length === 0;

const getGroupsFile = async function([{ filePath, bucket }]) {
  const bucketDirectory = filePath.split(meetupGroupsDirectory)[0];
  const fileList = await getListFromS3(bucket, bucketDirectory);
  const groupsFilePath = fileList.find(({ Key: bucketFilepath }) =>
    bucketFilepath.includes(meetupGroupsFilePrefix)
  );
  const data = await getFromS3(bucket, groupsFilePath.Key);
  return JSON.parse(data.Body.toString());
};

const getGroupData = function(events, groups) {
  if (events.length === 0) return null;
  return groups.find(({ id }) => events[0].group.id === id);
};

const uploadData = function(bucketName, eventsPage) {
  return uploadTo(
    bucketName,
    (today, hash) => `meetupcom-events__${today.valueOf()}__${hash}.json`,
    eventsPage
  );
};

module.exports.transform = async (event, context, callback) => {
  try {
    const newFiles = event.Records.map(({ s3: { bucket, object: file } }) => ({
      bucket: bucket.name,
      filePath: file.key
    })).filter(
      ({ filePath }) =>
        !path.basename(filePath).startsWith(meetupGroupsFilePrefix)
    );

    if (newFiles.length === 0) {
      callback(null, { message: [] });
      return;
    }

    const groupsData = await getGroupsFile(newFiles);

    const transformedFiles = await Promise.all(
      await newFiles.map(async function({ bucket, filePath }) {
        const data = await getFromS3(bucket, filePath);
        const events = JSON.parse(data.Body.toString());

        const upcomingEvents = events.filter(isUpcomingEvent);
        if (upcomingEvents.length === 0) {
          console.log(`No upcoming events from ${filePath}`); // eslint-disable-line no-console
          return [];
        }

        const groupData = getGroupData(upcomingEvents, groupsData);
        const transformedEvents = upcomingEvents.map(rawEvent =>
          transformEvent({}, rawEvent, groupData)
        );

        const validEvents = transformedEvents.filter(isValidEvent);

        if (validEvents.length !== transformedEvents.length) {
          console.log("WARNING: some events generated were not valid!"); // eslint-disable-line no-console
        }

        return validEvents;
      })
    );

    const { eventsBucket } = buckets();
    const filePaths = await Promise.all(
      await transformedFiles
        .filter(transformedFile => transformedFile.lenth > 0)
        .map(async function(transformedFile) {
          return (await uploadData(eventsBucket, transformedFile)).key;
        })
    );

    callback(null, { message: filePaths });
  } catch (err) {
    callback(err, null);
  }
};

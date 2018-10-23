"use strict";

const { getFromS3 } = require("aws-lambda-data-utils");
const { validate } = require("jsonschema");
const eventSchema = require("./schemas/event-schema");
const { buckets } = require("../config");
const { uploadTo } = require("../utils");

const getLogoFrom = function({ logo }) {
  if (!logo) return undefined;

  return {
    high: logo.original ? logo.original.url.trim() : undefined,
    regular: logo.url.trim()
  };
};

const getTopicsFrom = function({ category, subcategory }) {
  return [category, subcategory].reduce(
    (topics, source) => (!source ? topics : topics.concat(source.name.trim())),
    []
  );
};

const getChargeFrom = function({
  is_free: isFree,
  ticket_availability: tickets
}) {
  if (isFree) return { is_free: true };

  return {
    is_free: false,
    cost: {
      currency: tickets.minimum_ticket_price.currency.trim(),
      value: tickets.minimum_ticket_price.value
    }
  };
};

const transformEvent = function(defaults, event) {
  const {
    id,
    name,
    description,
    url,
    start,
    end,
    venue,
    organizer,
    created,
    changed
  } = event;
  const startDate = new Date(start.utc);
  const endDate = new Date(end.utc);

  return {
    name: name.text.trim(),
    description: description.text.trim(),
    url,
    times: {
      start: {
        utc: startDate.toISOString(),
        timezone: start.timezone.trim()
      },
      end: {
        utc: endDate.toISOString(),
        timezone: end.timezone.trim()
      },
      duration: endDate - startDate
    },
    logo: getLogoFrom(event),
    topics: getTopicsFrom(event),
    venue: {
      name: (venue.name || venue.address.localized_address_display).trim(),
      address: venue.address.localized_address_display.trim(),
      city: venue.address.city || undefined,
      country: (venue.address.country || defaults.country).trim(),
      latitude: venue.latitude.trim(),
      longitude: venue.longitude.trim()
    },
    organiser: {
      name: organizer.name.trim()
    },
    charge: getChargeFrom(event),
    created_at: new Date(created).toISOString(),
    last_updated: new Date(changed).toISOString(),
    source_data: {
      name: "eventbrite",
      id
    }
  };
};

const isValidEvent = event => validate(event, eventSchema).errors.length === 0;

const uploadData = function(bucketName, eventsPage) {
  return uploadTo(
    bucketName,
    (today, hash) => `eventbrite-events__${today.valueOf()}__${hash}.json`,
    eventsPage
  );
};

module.exports.transform = async (event, context, callback) => {
  try {
    const records = event.Records;

    const transformedFiles = await Promise.all(
      await records.map(async function({ s3: { bucket, object: file } }) {
        const data = await getFromS3(bucket.name, file.key);
        const response = JSON.parse(data.Body.toString());

        const transformedEvents = response.events.map(rawEvent =>
          transformEvent({ country: "GB" }, rawEvent)
        );

        const validEvents = transformedEvents.filter(isValidEvent);

        if (validEvents.length !== transformedEvents.length) {
          console.log("WARNING: some events generated were not valid!");
        }

        return validEvents;
      })
    );

    const { eventsBucket } = buckets();
    const filePaths = await Promise.all(
      await transformedFiles.map(async function(transformedFile) {
        return (await uploadData(eventsBucket, transformedFile)).key;
      })
    );

    callback(null, { message: filePaths });
  } catch (err) {
    callback(err, null);
  }
};

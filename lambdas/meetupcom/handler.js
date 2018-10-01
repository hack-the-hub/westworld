"use strict";

const {
  createHash,
  getDateTimePathFor,
  getFromWeb,
  setInS3
} = require("aws-lambda-data-utils");
const { bucketName, getGroupsUrl, getEventsUrl } = require("./config");

const getErrors = function(groupsEvents) {
  return groupsEvents.reduce(function(errors, groupEvents) {
    if (groupEvents.errors) return errors.concat([groupEvents.errors]);
    return errors;
  }, []);
};

const uploadTo = function(createFilename, data) {
  const fileContents = JSON.stringify(data);
  const today = new Date();
  const hash = createHash(fileContents);
  const prefix = getDateTimePathFor(today);
  const filename = createFilename(today, hash);
  const filePath = `${prefix}/${filename}`;

  return setInS3(prefix, bucketName, filePath, fileContents);
};

const uploadData = function(groups, groupsEvents) {
  const groupsUpload = uploadTo(
    (today, hash) => `meetupcom-groups__${today.valueOf()}__${hash}.json`,
    groups
  );

  const eventsUploads = groupsEvents.map(function(groupEvents, index) {
    const { urlname } = groups[index];
    return uploadTo(
      (today, hash) =>
        `groups-events/meetupcom-group-${urlname.toLowerCase()}__${today.valueOf()}__${hash}.json`,
      groupEvents
    );
  });

  return [groupsUpload].concat(eventsUploads);
};

module.exports.hello = async (event, context, callback) => {
  try {
    // Read list of local meet-up groups
    const groups = JSON.parse(await getFromWeb(getGroupsUrl()));

    if (groups.errors) {
      callback(groups.errors, null);
      return;
    }

    // Read list of upcoming events for those groups
    const eventsRequests = groups.map(({ urlname }) =>
      getFromWeb(getEventsUrl(urlname))
    );
    const groupsEvents = (await Promise.all(eventsRequests)).map(JSON.parse);

    const groupsErrors = getErrors(groupsEvents);
    if (groupsErrors.length > 0) {
      callback(groupsErrors, null);
      return;
    }

    // Write captured data to S3
    const uploads = uploadData(groups, groupsEvents);
    const message = (await Promise.all(uploads)).map(({ key }) => key);

    callback(null, { message, event });
  } catch (err) {
    callback(err, null);
  }
};

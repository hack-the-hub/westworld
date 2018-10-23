"use strict";

const { getFromWeb } = require("aws-lambda-data-utils");
const { buckets, getGroupsUrl, getEventsUrl } = require("../config");
const { uploadTo } = require("../utils");

const getErrors = function(groupsEvents) {
  return groupsEvents.reduce(function(errors, groupEvents) {
    if (groupEvents.errors) return errors.concat([groupEvents.errors]);
    return errors;
  }, []);
};

const uploadData = function(bucketName, groups, groupsEvents) {
  const groupsUpload = uploadTo(
    bucketName,
    (today, hash) => `meetupcom-groups__${today.valueOf()}__${hash}.json`,
    groups
  );

  const eventsUploads = groupsEvents.map(function(groupEvents, index) {
    const { urlname } = groups[index];
    return uploadTo(
      bucketName,
      (today, hash) =>
        `groups-events/meetupcom-group-${urlname.toLowerCase()}__${today.valueOf()}__${hash}.json`,
      groupEvents
    );
  });

  return [groupsUpload].concat(eventsUploads);
};

module.exports.produce = async (event, context, callback) => {
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
    const { producerBucket } = buckets();
    const uploads = uploadData(producerBucket, groups, groupsEvents);
    const filePaths = (await Promise.all(uploads)).map(({ key }) => key);

    callback(null, { message: filePaths });
  } catch (err) {
    callback(err, null);
  }
};

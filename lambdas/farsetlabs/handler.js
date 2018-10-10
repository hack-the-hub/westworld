"use strict";

const icalendar = require('icalendar');
const {
  createHash,
  getDateTimePathFor,
  getFromWeb,
  setInS3
} = require("aws-lambda-data-utils");
const { bucketName, getEventsUrl } = require("./config");

const getFromApi = async function() {
  const initialResponse = await getFromWeb(getEventsUrl());
  const calendar = icalendar.parse_calendar(initialResponse);

  if (calendar.events().length < 1) {
    throw new Error("No events found");
  }

  return initialResponse;
}

const uploadTo = function(createFilename, fileContents) {
  const today = new Date();
  const hash = createHash(fileContents);
  const prefix = getDateTimePathFor(today);
  const filename = createFilename(today, hash);
  const filePath = `${prefix}/${filename}`;

  return setInS3(prefix, bucketName, filePath, fileContents);
};

const uploadData = function(calendarData) {
    return uploadTo(
      (today, hash) =>
        `farset-labs-calendar__${today.valueOf()}__${hash}.ics`,
        calendarData
    );
};

module.exports.produce = async (event, context, callback) => {
  try {
    // Read list of upcoming events
    const calendarData = await getFromApi();

    // Write captured data to S3
    const message = (await uploadData(calendarData)).key;

    callback(null, { message, event });
  } catch (err) {
    callback(err, null);
  }
};

"use strict";

const { getFromS3 } = require("aws-lambda-data-utils");
const { validate } = require("jsonschema");
const eventSchema = require("./schemas/event-schema");
const { buckets } = require("../config");
const { uploadData } = require("../utils");

const transformEvent = function (defaults, {
  id, summary, description, start, end, created, updated
}) {
  const startDate = new Date(start.dateTime);
  const endDate = new Date(end.dateTime);

  return {
    name: summary,
    description,
    url: "https://www.farsetlabs.org.uk/events/#upcoming-events",
    times: {
      start: {
        utc: startDate.toISOString(),
        timezone: start.timeZone || defaults.timeZone
      },
      end: {
        utc: endDate.toISOString(),
        timezone: end.timeZone || defaults.timeZone
      },
      duration: endDate - startDate
    },
    topics: [],
    venue: {
      name: "Farset Labs",
      latitude: "54.592826",
      longitude: "-5.940666",
      address: "Weavers Court, Linfield Road, BT12 5GH",
      city: "Belfast",
      country: "GB"
    },
    created_at: new Date(created).toISOString(),
    last_updated: new Date(updated).toISOString(),
    source_data: {
      name: "farsetlabs-calendar",
      id
    }
  };
};

const isValidEvent = (event) => validate(event, eventSchema).errors.length === 0;

module.exports.transform = async (event, context, callback) => {
  try {
    const records = event.Records;

    const transformedCalendars = await Promise.all(await records.map(async function ({
      s3: { bucket, object: file }
    }) {
      const calendarData = await getFromS3(bucket.name, file.key);
      const calendar = JSON.parse(calendarData.Body.toString());

      const transformedEvents = calendar.items.map((event) => (
        transformEvent({ timeZone: calendar.timeZone }, event)
      ));

      const validEvents = transformedEvents.filter(isValidEvent)

      if (validEvents.length !== transformedEvents.length) {
        console.log('WARNING: some events generated were not valid!')
      }

      return validEvents;
    }));

    const { eventsBucket } = buckets();
    const filePaths = await Promise.all(await transformedCalendars.map(async function (transformedCalendar) {
      return (await uploadData(eventsBucket, transformedCalendar)).key;
    }));

    callback(null, { message: filePaths });
  } catch (err) {
    callback(err, null);
  }
};

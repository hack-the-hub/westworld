const { addYear, convert } = require("./utils");

const CALENDAR_ID =
  "farsetlabs.org.uk_srmqnkn373auq51u00s2nijrq8%40group.calendar.google.com";

const eventsApi = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events`;
const eventsParams = () =>
  convert({
    maxResults: 2500,
    singleEvents: true,
    orderBy: "startTime",
    timeMin: new Date().toISOString(),
    timeMax: addYear(new Date()).toISOString(),
    key: process.env.GOOGLE_CALENDAR_API_TOKEN
  });

module.exports = {
  buckets: () => ({
    producerBucket: "muxer-produced-events-farsetlabs",
    eventsBucket: "muxer-transformed-events"
  }),
  getEventsUrl: () => `${eventsApi}?${eventsParams()}`
};

const { convert } = require("./utils");

const MEETUPCOM_TECH_CATEGORY = 34;

const groupsApi = "https://api.meetup.com/find/groups";
const groupsParams = convert({
  "photo-host": "public",
  country: "GB",
  lon: -6.762739,
  lat: 54.6425126, // Cookstown
  radius: 60, // 60 mile radius (all of Northern Ireland)
  fields: "approved,best_topics,past_event_count,plain_text_description,topics",
  upcoming_events: true,
  fallback_suggestions: false,
  category: MEETUPCOM_TECH_CATEGORY,
  page: 200,
  sign: true,
  key: process.env.MEETUPCOM_API_TOKEN
});

const eventsApi = slug => `https://api.meetup.com/${slug}/events`;
const eventsParams = convert({
  "photo-host": "public",
  status: "cancelled,past,proposed,suggested,upcoming",
  page: 200
});

module.exports = {
  buckets: () => ({
    producerBucket: "muxer-produced-events-meetupcom",
    eventsBucket: "muxer-transformed-events"
  }),
  getGroupsUrl: () => `${groupsApi}?${groupsParams}`,
  getEventsUrl: slug => `${eventsApi(slug)}?${eventsParams}`
};

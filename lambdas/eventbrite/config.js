const { convert } = require("./utils");

const EVENTBRITE_TECH_CATEGORY = 102;

const eventsApi = "https://www.eventbriteapi.com/v3/events/search/";
const eventsParams = page =>
  convert({
    page,
    sort_by: "date",
    "location.longitude": -6.762739,
    "location.latitude": 54.6425126, // Cookstown
    "location.within": "60mi", // 60 mile radius (all of Northern Ireland)
    expand: "logo,venue,organizer,format,category,subcategory,bookmark_info,refund_policy,ticket_availability",
    categories: EVENTBRITE_TECH_CATEGORY,
    token: process.env.EVENTBRITE_API_TOKEN
  });

module.exports = {
  buckets: () => ({
    producerBucket: "muxer-produced-events-eventbrite",
    eventsBucket: "muxer-transformed-events"
  }),
  getEventsUrl: ({ page }) => `${eventsApi}?${eventsParams(page)}`
};

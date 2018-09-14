const EVENTBRITE_TECH_CATEGORY = 102;

const convert = params =>
  Object.entries(params)
    .map(([key, val]) => `${key}=${val}`)
    .join("&");

const eventsApi = "https://www.eventbriteapi.com/v3/events/search/";
const eventsParams = page =>
  convert({
    page,
    sort_by: "date",
    "location.longitude": -6.762739,
    "location.latitude": 54.6425126, // Cookstown
    "location.within": "60mi", // 60 mile radius (all of Northern Ireland)
    categories: EVENTBRITE_TECH_CATEGORY,
    token: process.env.EVENTBRITE_API_TOKEN
  });

module.exports = {
  bucketName: "eventbrite-events-bucket",
  getEventsUrl: ({ page }) => `${eventsApi}?${eventsParams(page)}`
};

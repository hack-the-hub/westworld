"use strict";

const { getFromWeb } = require("aws-lambda-data-utils");
const { buckets, getEventsUrl } = require("../config");
const { uploadTo } = require("../utils");

const getErrors = function(eventsPages) {
  return eventsPages.reduce(function(errors, eventsPage) {
    if (eventsPage.error) return errors.concat([eventsPage]);
    return errors;
  }, []);
};

const getFromApi = async function() {
  const initialResponse = await getFromWeb(getEventsUrl({ page: 0 }));
  const initialData = JSON.parse(initialResponse);

  if (initialData.error) return [initialResponse];
  const { pagination } = initialData;
  if (!pagination.has_more_items) return [initialResponse];

  const pagesNumbers = new Array(pagination.page_count - 1)
    .fill()
    .map((val, index) => index + 2);
  const requests = pagesNumbers.map(page => getFromWeb(getEventsUrl({ page })));
  return Promise.all([initialResponse].concat(requests));
};

const uploadData = function(bucketName, eventsPage, { index }) {
  return uploadTo(
    bucketName,
    (today, hash) =>
      `eventbrite-events-page-${index + 1}__${today.valueOf()}__${hash}.json`,
    eventsPage
  );
};

module.exports.produce = async (event, context, callback) => {
  try {
    // Read list of upcoming events
    const eventsPages = (await getFromApi()).map(JSON.parse);

    const eventsErrors = getErrors(eventsPages);
    if (eventsErrors.length > 0) {
      callback(eventsErrors, null);
      return;
    }

    // Write captured data to S3
    const { producerBucket } = buckets();
    const filePaths = await Promise.all(await eventsPages.map(async function (eventsPage, index) {
      return (await uploadData(producerBucket, eventsPage, { index })).key;
    }));

    callback(null, { message: filePaths });
  } catch (err) {
    callback(err, null);
  }
};

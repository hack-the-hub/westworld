"use strict";

const {
  createHash,
  getDateTimePathFor,
  getFromWeb,
  setInS3
} = require("aws-lambda-data-utils");
const { bucketName, getEventsUrl } = require("./config");

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

const uploadTo = function(createFilename, data) {
  const fileContents = JSON.stringify(data);
  const today = new Date();
  const hash = createHash(fileContents);
  const prefix = getDateTimePathFor(today);
  const filename = createFilename(today, hash);
  const filePath = `${prefix}/${filename}`;

  return setInS3(prefix, bucketName, filePath, fileContents);
};

const uploadData = function(eventsPages) {
  return eventsPages.map(function(eventsPage, index) {
    return uploadTo(
      (today, hash) =>
        `eventbrite-events-page-${index + 1}__${today.valueOf()}__${hash}.json`,
      eventsPage
    );
  });
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
    const uploads = uploadData(eventsPages);
    const message = (await Promise.all(uploads)).map(({ key }) => key);

    callback(null, { message, event });
  } catch (err) {
    callback(err, null);
  }
};

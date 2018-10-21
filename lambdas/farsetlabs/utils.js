const {
  createHash,
  getDateTimePathFor,
  setInS3
} = require("aws-lambda-data-utils");

const uploadTo = function(bucketName, createFilename, data) {
  const fileContents = JSON.stringify(data);
  const today = new Date();
  const hash = createHash(fileContents);
  const prefix = getDateTimePathFor(today);
  const filename = createFilename(today, hash);
  const filePath = `${prefix}/${filename}`;

  return setInS3(prefix, bucketName, filePath, fileContents);
};

const addYear = date => new Date(date.setFullYear(date.getFullYear() + 1));

const convert = params =>
  Object.entries(params)
    .map(([key, val]) => `${key}=${val}`)
    .join("&");

module.exports = {
  uploadTo,
  addYear,
  convert
};

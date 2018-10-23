jest.mock("../../eventbrite/node_modules/aws-lambda-data-utils", () => ({
  getFromWeb: jest.fn(),
  getFromS3: jest.fn()
}));

jest.mock("../../eventbrite/utils", () =>
  Object.assign(require.requireActual("../../eventbrite/utils"), {
    uploadTo: jest.fn()
  })
);

const prefix = "../../../eventbrite";

const resolved = data => () => Promise.resolve(data);

const resolvedResponse = (data = {}, overrides) =>
  Promise.resolve(JSON.stringify(Object.assign(data, overrides)));

module.exports = {
  prefix,
  resolved,
  resolvedResponse
};

const { prefix, resolved } = require("../test-utils");
const { getFromS3 } = require(`${prefix}/node_modules/aws-lambda-data-utils`);
const { uploadTo } = require(`${prefix}/utils`);
const transformer = require(`${prefix}/handlers/transformer`);

const requireData = filename =>
  JSON.stringify(require(`./test-data/${filename}.json`)); // eslint-disable-line global-require

const emptyEventsList = requireData("events-payload-empty");
const invalidEventsList = requireData("events-payload-invalid");
const incompleteEventsList = requireData("events-payload-incomplete");
const populatedEventsList = requireData("events-payload-populated");

const context = null;
let event;

describe("Eventbrite transformer", function() {
  beforeEach(function() {
    jest.clearAllMocks();
    event = null;
    uploadTo.mockImplementation(resolved({ key: "path/to/new/file.json" }));
  });

  it("is a lambda handler", function() {
    expect(typeof transformer).toBe("object");
    expect(typeof transformer.transform).toBe("function");
  });

  describe("when no new file is added to the bucket", function() {
    beforeEach(function() {
      event = {
        Records: []
      };
    });

    it("does not return an error and returns empty message", function(done) {
      transformer.transform(event, context, function(err, response) {
        expect(err).toBe(null);
        expect(response).toEqual({ message: [] });
        done();
      });
    });

    it("does not uploads anything", function(done) {
      transformer.transform(event, context, function() {
        expect(uploadTo).toHaveBeenCalledTimes(0);
        done();
      });
    });
  });

  describe("when a new file is added to the bucket", function() {
    beforeEach(function() {
      event = {
        Records: [
          {
            s3: {
              bucket: "test-muxer-bucket",
              object: { Key: "path/to/events.json" }
            }
          }
        ]
      };
    });

    describe("which contains no events", function() {
      beforeEach(function() {
        getFromS3.mockImplementation(resolved({ Body: emptyEventsList }));
      });

      it("does not return an error and returns message", function(done) {
        transformer.transform(event, context, function(err, response) {
          expect(err).toBe(null);
          expect(response).toEqual({ message: ["path/to/new/file.json"] });
          done();
        });
      });

      it("uploads empty events list", function(done) {
        transformer.transform(event, context, function() {
          expect(uploadTo).toHaveBeenCalledTimes(1);
          expect(uploadTo).toHaveBeenCalledWith(
            "muxer-transformed-events",
            expect.any(Function),
            []
          );
          done();
        });
      });
    });

    describe("which contains an invalid event", function() {
      beforeEach(function() {
        getFromS3.mockImplementation(resolved({ Body: invalidEventsList }));
      });

      it("returns an error", function(done) {
        transformer.transform(event, context, function(err, response) {
          expect(err).toEqual(
            new TypeError("Cannot read property 'utc' of undefined")
          );
          expect(response).toBe(null);
          done();
        });
      });

      it("does not upload data", function(done) {
        transformer.transform(event, context, function() {
          expect(uploadTo).not.toHaveBeenCalled();
          done();
        });
      });
    });

    describe("which contains incomplete events", function() {
      beforeEach(function() {
        jest.spyOn(global.console, "log").mockImplementation(() => {});
        getFromS3.mockImplementation(resolved({ Body: incompleteEventsList }));
      });

      it("does not return an error and returns message", function(done) {
        transformer.transform(event, context, function(err, response) {
          expect(err).toBe(null);
          expect(response).toEqual({ message: ["path/to/new/file.json"] });
          done();
        });
      });

      it("uploads transformed events list, without incomplete events", function(done) {
        transformer.transform(event, context, function() {
          expect(uploadTo).toHaveBeenCalledTimes(1);
          expect(uploadTo.mock.calls[0][2].length).toBe(4);
          expect(uploadTo.mock.calls).toMatchSnapshot();
          done();
        });
      });

      it("outputs warning", function(done) {
        /* eslint-disable no-console */
        transformer.transform(event, context, function() {
          expect(console.log).toHaveBeenCalledTimes(1);
          expect(console.log).toHaveBeenCalledWith(
            "WARNING: some events generated were not valid!"
          );
          done();
        });
      });
    });

    describe("which contains complete events", function() {
      beforeEach(function() {
        getFromS3.mockImplementation(resolved({ Body: populatedEventsList }));
      });

      it("does not return an error and returns message", function(done) {
        transformer.transform(event, context, function(err, response) {
          expect(err).toBe(null);
          expect(response).toEqual({ message: ["path/to/new/file.json"] });
          done();
        });
      });

      it("uploads transformed events list", function(done) {
        transformer.transform(event, context, function() {
          expect(uploadTo).toHaveBeenCalledTimes(1);
          expect(uploadTo.mock.calls[0][2].length).toBe(5);
          expect(uploadTo.mock.calls).toMatchSnapshot();
          done();
        });
      });
    });
  });

  describe("when multiple new files are added to the bucket", function() {
    beforeEach(function() {
      event = {
        Records: [
          {
            s3: {
              bucket: "test-muxer-bucket",
              object: { Key: "path/to/events-1.json" }
            }
          },
          {
            s3: {
              bucket: "test-muxer-bucket",
              object: { Key: "path/to/events-2.json" }
            }
          }
        ]
      };

      getFromS3
        .mockReturnValueOnce(resolved({ Body: populatedEventsList })())
        .mockReturnValueOnce(resolved({ Body: populatedEventsList })());
    });

    it("does not return an error and returns messages", function(done) {
      transformer.transform(event, context, function(err, response) {
        expect(err).toBe(null);
        expect(response).toEqual({
          message: ["path/to/new/file.json", "path/to/new/file.json"]
        });
        done();
      });
    });

    it("uploads transformed events lists", function(done) {
      transformer.transform(event, context, function() {
        expect(uploadTo).toHaveBeenCalledTimes(2);
        expect(uploadTo.mock.calls[0][2].length).toBe(5);
        expect(uploadTo.mock.calls[1][2].length).toBe(5);
        expect(uploadTo.mock.calls).toMatchSnapshot();
        done();
      });
    });
  });
});

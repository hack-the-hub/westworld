process.env.EVENTBRITE_API_TOKEN = "eventbrite-token-abc123";

const { prefix, resolved, resolvedResponse } = require("../test-utils");
const { getFromWeb } = require(`${prefix}/node_modules/aws-lambda-data-utils`);
const { uploadTo } = require(`${prefix}/utils`);
const producer = require(`${prefix}/handlers/producer`);

const apiCallPage = page =>
  `https://www.eventbriteapi.com/v3/events/search/?page=${page}&sort_by=date&location.longitude=-6.762739&location.latitude=54.6425126&location.within=60mi&expand=logo,venue,organizer,format,category,subcategory,bookmark_info,refund_policy,ticket_availability&categories=102&token=eventbrite-token-abc123`;

const errorResponse = data => resolvedResponse(data, { error: "test error" });

const singleResponse = data =>
  resolvedResponse(data, {
    pagination: { has_more_items: false, page_count: 1 }
  });

const initialResponse = data =>
  resolvedResponse(data, {
    pagination: { has_more_items: true, page_count: 3 }
  });

const finalResponse = data =>
  resolvedResponse(data, {
    pagination: { has_more_items: false, page_count: 3 }
  });

const event = null;
const context = null;

describe("Eventbrite Producer", function() {
  beforeEach(function() {
    jest.clearAllMocks();
    uploadTo.mockImplementation(resolved({ key: "path/to/new/file.json" }));
  });

  it("is a lambda handler", function() {
    expect(typeof producer).toBe("object");
    expect(typeof producer.produce).toBe("function");
  });

  describe("when an error is returned", function() {
    beforeEach(function() {
      getFromWeb.mockImplementation(() => errorResponse());
    });

    it("returns an error", function(done) {
      producer.produce(event, context, function(err, response) {
        expect(err).toEqual([{ error: "test error" }]);
        expect(response).toBe(null);
        done();
      });
    });

    it("makes a request to the API", function(done) {
      producer.produce(event, context, function() {
        expect(getFromWeb).toHaveBeenCalledTimes(1);
        expect(getFromWeb).toHaveBeenCalledWith(apiCallPage(1));
        done();
      });
    });

    it("does not upload data", function(done) {
      producer.produce(event, context, function() {
        expect(uploadTo).not.toHaveBeenCalled();
        done();
      });
    });
  });

  describe("when the results list is paginated on a single page", function() {
    beforeEach(function() {
      getFromWeb.mockImplementation(() => singleResponse());
    });

    it("does not return an error and returns message", function(done) {
      producer.produce(event, context, function(err, response) {
        expect(err).toBe(null);
        expect(response).toEqual({ message: ["path/to/new/file.json"] });
        done();
      });
    });

    it("makes a request to the API", function(done) {
      producer.produce(event, context, function() {
        expect(getFromWeb).toHaveBeenCalledTimes(1);
        expect(getFromWeb).toHaveBeenCalledWith(apiCallPage(1));
        done();
      });
    });

    it("uploads data", function(done) {
      producer.produce(event, context, function() {
        expect(uploadTo).toHaveBeenCalledTimes(1);
        expect(uploadTo).toHaveBeenCalledWith(
          "muxer-produced-events-eventbrite",
          expect.any(Function),
          { pagination: { has_more_items: false, page_count: 1 } }
        );
        done();
      });
    });
  });

  describe("when the results list is paginated into multiple pages", function() {
    beforeEach(function() {
      getFromWeb
        .mockReturnValueOnce(
          initialResponse({ events: [{ name: "First Event" }] })
        )
        .mockReturnValueOnce(
          initialResponse({ events: [{ name: "Second Event" }] })
        )
        .mockReturnValue(finalResponse({ events: [{ name: "Last Event" }] }));
    });

    it("does not return an error and returns message", function(done) {
      producer.produce(event, context, function(err, response) {
        expect(err).toBe(null);
        expect(response).toEqual({
          message: [
            "path/to/new/file.json",
            "path/to/new/file.json",
            "path/to/new/file.json"
          ]
        });
        done();
      });
    });

    it("makes a request to the API", function(done) {
      producer.produce(event, context, function() {
        expect(getFromWeb).toHaveBeenCalledTimes(3);
        expect(getFromWeb).toHaveBeenCalledWith(apiCallPage(1));
        expect(getFromWeb).toHaveBeenCalledWith(apiCallPage(2));
        expect(getFromWeb).toHaveBeenCalledWith(apiCallPage(3));
        done();
      });
    });

    it("uploads data", function(done) {
      producer.produce(event, context, function() {
        expect(uploadTo).toHaveBeenCalledTimes(3);
        expect(uploadTo).toHaveBeenCalledWith(
          "muxer-produced-events-eventbrite",
          expect.any(Function),
          {
            events: [{ name: "First Event" }],
            pagination: { has_more_items: true, page_count: 3 }
          }
        );
        expect(uploadTo).toHaveBeenCalledWith(
          "muxer-produced-events-eventbrite",
          expect.any(Function),
          {
            events: [{ name: "Second Event" }],
            pagination: { has_more_items: true, page_count: 3 }
          }
        );
        expect(uploadTo).toHaveBeenCalledWith(
          "muxer-produced-events-eventbrite",
          expect.any(Function),
          {
            events: [{ name: "Last Event" }],
            pagination: { has_more_items: false, page_count: 3 }
          }
        );
        done();
      });
    });
  });

  describe("when the results list is paginated but there are errors on subsequent requests", function() {
    beforeEach(function() {
      getFromWeb
        .mockReturnValueOnce(
          initialResponse({ events: [{ name: "First Event" }] })
        )
        .mockReturnValueOnce(errorResponse({ page: 2 }))
        .mockReturnValue(errorResponse({ page: 3 }));
    });

    it("return the errors", function(done) {
      producer.produce(event, context, function(err, response) {
        expect(err).toEqual([
          { error: "test error", page: 2 },
          { error: "test error", page: 3 }
        ]);
        expect(response).toBe(null);
        done();
      });
    });

    it("makes a request to the API", function(done) {
      producer.produce(event, context, function() {
        expect(getFromWeb).toHaveBeenCalledTimes(3);
        expect(getFromWeb).toHaveBeenCalledWith(apiCallPage(1));
        expect(getFromWeb).toHaveBeenCalledWith(apiCallPage(2));
        expect(getFromWeb).toHaveBeenCalledWith(apiCallPage(3));
        done();
      });
    });

    it("does not upload data", function(done) {
      producer.produce(event, context, function() {
        expect(uploadTo).not.toHaveBeenCalled();
        done();
      });
    });
  });
});

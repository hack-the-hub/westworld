const producer = require("../../../meetupcom/handlers/producer");

describe("Meetup.com Producer", function() {
  it("is a lambda handler", function() {
    expect(typeof producer).toBe("object");
    expect(typeof producer.produce).toBe("function");
  });
});

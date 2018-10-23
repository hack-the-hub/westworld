const transformer = require("../../../meetupcom/handlers/transformer");

describe("Meetup.com transformer", function() {
  it("is a lambda handler", function() {
    expect(typeof transformer).toBe("object");
    expect(typeof transformer.transform).toBe("function");
  });
});

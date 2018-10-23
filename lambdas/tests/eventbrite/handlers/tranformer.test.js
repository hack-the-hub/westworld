const transformer = require("../../../eventbrite/handlers/transformer");

describe("Eventbrite transformer", function() {
  it("is a lambda handler", function() {
    expect(typeof transformer).toBe("object");
    expect(typeof transformer.transform).toBe("function");
  });
});

const transformer = require("../../../farsetlabs/handlers/transformer");

describe("Farsetlabs transformer", function() {
  it("is a lambda handler", function() {
    expect(typeof transformer).toBe("object");
    expect(typeof transformer.transform).toBe("function");
  });
});

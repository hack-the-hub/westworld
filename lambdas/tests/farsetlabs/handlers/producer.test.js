const producer = require("../../../farsetlabs/handlers/producer");

describe("Farsetlabs Producer", function() {
  it("is a lambda handler", function() {
    expect(typeof producer).toBe("object");
    expect(typeof producer.produce).toBe("function");
  });
});

const producer = require("../../../eventbrite/handlers/producer");

describe("Eventbrite Producer", function() {
  it("is a lambda handler", function() {
    expect(typeof producer).toBe("object");
    expect(typeof producer.produce).toBe("function");
  });
});

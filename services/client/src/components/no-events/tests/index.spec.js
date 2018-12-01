import React from "react";
import NoEvents from "../";

describe("no-events", function() {
  it("renders", function() {
    expect(<NoEvents location={"belfast"}/>).toMatchSnapshot("location");
  });
});

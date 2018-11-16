import React from "react";
import renderer from "react-test-renderer";
import Events from "../events";

jest.mock(
  "components/call-to-action-banner",
  () => "mock-call-to-action-banner"
);
jest.mock("components/spinner/loading", () => "mock-loading");
jest.mock("components/event", () => "mock-event");
jest.mock("components/event/error", () => "mock-error");
jest.mock("components/no-events", () => "mock-no-events");
jest.mock("components/event-separator", () => "mock-event-separator");

describe("Events", () => {
  let testContext;

  const createComponent = props => <Events {...props} />;

  beforeEach(() => {
    testContext = {};
    testContext.defaultProps = {
      fetchData: () => jest.fn(),
      isLoading: false,
      hasErrors: false,
      upcomingEvents: [{ id: "1" }, { id: "2" }],
      recentEvents: [{ id: "1" }, { id: "2" }]
    };
  });

  describe("when the component is rendered", () => {
    beforeEach(() => {
      testContext.component = renderer.create(
        createComponent(testContext.defaultProps)
      );
    });

    it("renders correctly", () => {
      expect(testContext.component).toMatchSnapshot();
    });
  });

  describe("when the component is rendered with errors", () => {
    beforeEach(() => {
      testContext.props = {
        ...testContext.defaultProps,
        hasErrors: true
      };

      testContext.component = renderer.create(
        createComponent(testContext.props)
      );
    });

    it("renders correctly", () => {
      expect(testContext.component).toMatchSnapshot();
    });
  });
});

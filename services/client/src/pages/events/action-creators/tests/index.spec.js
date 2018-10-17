import configureMockStore from "redux-mock-store";
import fetchMock from "fetch-mock";
import thunk from "redux-thunk";
import * as Actions from "../events";
import * as Types from "../../actions";
import { events } from "../../reducers/events";
import moment from "moment/moment";
import {
  getRecentEvents,
  getUpcomingEvents,
  hasErrors,
  isLoading
} from "../../selectors";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("async actions", () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it("creates EVENTS_FETCH_DATA_SUCCESS when fetching events has been done", () => {
    fetchMock.getOnce("/events", {
      status: 200,
      sendAsJson: true,
      body: {
        events: {
          recent_events: [],
          upcoming_events: []
        },
        status: "success"
      },
      headers: { "content-type": "application/json" }
    });

    const expectedActions = [
      { type: Types.EVENTS_IS_LOADING, isLoading: true },
      { type: Types.EVENTS_IS_LOADING, isLoading: false },
      {
        type: Types.EVENTS_FETCH_DATA_SUCCESS,
        events: {
          events: {
            recent_events: [],
            upcoming_events: []
          },
          status: "success"
        }
      }
    ];
    const store = mockStore({ events: [] });
    const url = "/events";

    return store.dispatch(Actions.eventsFetchData(url)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe("actions", () => {
  it("should create an action to handle loading a events request", () => {
    const bool = true;
    const expectedAction = {
      type: Types.EVENTS_IS_LOADING,
      isLoading: bool
    };
    expect(Actions.eventsIsLoading(bool)).toEqual(expectedAction);
  });

  it("should create an action to handle a error events response", () => {
    const bool = true;
    const expectedAction = {
      type: Types.EVENTS_HAS_ERRORED,
      hasErrored: bool
    };
    expect(Actions.eventsHasErrored(bool)).toEqual(expectedAction);
  });

  it("should create an action to handle a successful events response", () => {
    const events = {};
    const expectedAction = {
      type: Types.EVENTS_FETCH_DATA_SUCCESS,
      events
    };
    expect(Actions.eventsFetchDataSuccess(events)).toEqual(expectedAction);
  });
});

const event = {
  category: "Technology Monthly",
  created: "2018-07-29T13:52:46.642580",
  deleted: null,
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
  duration: 10000,
  end: "2018-10-03T19:00:00",
  entry: [
    {
      description: "",
      id: "ea7c5b64-50be-439d-900a-6ed60fcf1ea3",
      type: "free"
    }
  ],
  id: "0611f963-0f2f-4bd3-8dc4-b3dea517f16f",
  meetup: [],
  name: "Monthly Meetup",
  source: "meetup",
  start: "2018-10-03T19:00:00",
  topics: ["technology"],
  updated: "2018-07-29T13:52:46.642589",
  url: "https://www.example.com/events/253133796/"
};

describe("reducer", () => {
  const defaultState = {
    isLoading: false,
    hasErrors: false,
    upcomingEvents: [],
    recentEvents: [],
    page: 1,
    hasMoreItems: true
  };
  it("should return the initial state", () => {
    expect(events(defaultState, {})).toEqual({
      ...defaultState
    });
  });

  it("should return the loading state", () => {
    const action = { type: Types.EVENTS_IS_LOADING };
    expect(events(defaultState, action)).toEqual({
      ...defaultState,
      isLoading: true
    });
  });

  it("should return the error state", () => {
    const action = { type: Types.EVENTS_HAS_ERRORED };
    expect(events(defaultState, action)).toEqual({
      ...defaultState,
      hasErrors: true,
      isLoading: false
    });
  });

  it("should return the state with updated events", () => {
    const updatedEvent = {
      ...event,
      timestamp: moment(event.start).valueOf()
    };
    const action = {
      type: Types.EVENTS_FETCH_DATA_SUCCESS,
      events: {
        data: {
          recent_events: [event],
          upcoming_events: [event]
        }
      }
    };
    expect(events(defaultState, action)).toEqual({
      ...defaultState,
      recentEvents: [updatedEvent],
      upcomingEvents: [updatedEvent],
      hasMoreItems: true,
      page: defaultState.page + 1
    });
  });
});

describe("selectors", () => {
  const state = {
    events: {
      isLoading: false,
      hasErrors: false,
      upcomingEvents: [event],
      recentEvents: [event]
    }
  };

  it("should return recent events", () => {
    expect(getRecentEvents(state)).toEqual(state.events.recentEvents);
  });

  it("should return upcoming events", () => {
    expect(getUpcomingEvents(state)).toEqual(state.events.upcomingEvents);
  });

  it("should return is loading", () => {
    expect(isLoading(state)).toEqual(state.events.isLoading);
  });

  it("should return has errors", () => {
    expect(hasErrors(state)).toEqual(state.events.hasErrors);
  });
});

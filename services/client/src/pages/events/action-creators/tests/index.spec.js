import configureMockStore from "redux-mock-store";
import fetchMock from "fetch-mock";
import thunk from "redux-thunk";
import * as Actions from "../events";
import * as Types from "../../actions";
import { events } from "../../reducers/events";

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

describe("reducer", () => {
  const defaultState = {
    isLoading: false,
    hasErrors: false,
    upcomingEvents: [],
    recentEvents: []
  };
  it("should return the initial state", () => {
    expect(events(defaultState, {})).toEqual({
        ...defaultState
      }
    );
  });

  it("should return the loading state", () => {
    const action = { type: Types.EVENTS_IS_LOADING };
    expect(events(defaultState, action)).toEqual(
      {
        ...defaultState,
        isLoading: true
      }
    );
  });

  it("should return the error state", () => {
    const action = { type: Types.EVENTS_HAS_ERRORED };
    expect(events(defaultState, action)).toEqual(
      {
        ...defaultState,
        hasErrors: true,
        isLoading: false
      }
    );
  });

  it("should return the state with updated events", () => {
    const event = {
      id: "007",
      name: "Example event",
      start: "20180908",
      url: "www.example-event.io",
      category: "Event",
      source: "Eventbrite"
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
    expect(events(defaultState, action)).toEqual(
      {
        ...defaultState,
        recentEvents: [{ ...event, timestamp: 1536361200000 }],
        upcomingEvents: [{ ...event, timestamp: 1536361200000 }]
      }
    );
  });
});

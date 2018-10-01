import configureMockStore from "redux-mock-store";
import fetchMock from "fetch-mock";
import thunk from "redux-thunk";
import * as Actions from "../events";
import * as Types from "../../actions";

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

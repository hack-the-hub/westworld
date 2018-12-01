import { updateEventsList } from "../utils";

const defaultState = {
  isLoading: false,
  hasErrors: false,
  upcomingEvents: [],
  recentEvents: [],
  hasMoreItems: true,
  url: `${process.env.REACT_APP_EVENTS_SERVICE_URL}/events`,
  params: { page: 1, location: "belfast" },
  location: "belfast"
};

export function events(state = defaultState, action) {
  switch (action.type) {
    case "EVENTS_IS_LOADING":
      return {
        ...state,
        isLoading: true
      };
    case "EVENTS_HAS_ERRORED":
      return {
        ...state,
        isLoading: false,
        hasErrors: true
      };
    case "EVENTS_FETCH_DATA_SUCCESS": {
      const { data } = action.events;

      const upcomingEvents = updateEventsList(
        state.upcomingEvents.concat(data.upcoming_events)
      );
      const recentEvents = updateEventsList(
        state.recentEvents.concat(data.recent_events)
      );

      const moreItemsAvailable =
        data.upcoming_events.length !== 0 || data.recent_events.length !== 0;

      return {
        ...state,
        upcomingEvents,
        recentEvents,
        isLoading: false,
        hasMoreItems: moreItemsAvailable,
        url: state.url,
        params: { ...state.params, page: state.params.page + 1 }
      };
    }
    case "EVENTS_UPDATE_LOCATION": {
      return {
        ...state,
        params: { ...state.params, location: action.location },
        location: action.location
      };
    }
    default: {
      return state;
    }
  }
}

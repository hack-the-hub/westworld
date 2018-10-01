import { updateEventsList } from "../utils";

const defaultState = {
  isLoading: false,
  hasErrors: false,
  upcomingEvents: [],
  recentEvents: []
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

      const upcomingEvents = updateEventsList(data.upcoming_events);
      const recentEvents = updateEventsList(data.recent_events);

      return {
        ...state,
        upcomingEvents,
        recentEvents,
        isLoading: false
      };
    }
    default: {
      return state;
    }
  }
}

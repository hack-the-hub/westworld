import axios from "axios";
import * as Actions from "../actions";

export function eventsHasErrored(bool) {
  return {
    type: Actions.EVENTS_HAS_ERRORED,
    hasErrored: bool
  };
}

export function eventsIsLoading(bool) {
  return {
    type: Actions.EVENTS_IS_LOADING,
    isLoading: bool
  };
}

export function eventsFetchDataSuccess(events) {
  return {
    type: Actions.EVENTS_FETCH_DATA_SUCCESS,
    events
  };
}

export function eventsFetchData(urlObject) {
  return dispatch => {
    dispatch(eventsIsLoading(true));

    return axios(urlObject)
      .then(({ data, statusText }) => {
        if (statusText !== "OK") {
          throw Error(statusText);
        }

        dispatch(eventsIsLoading(false));

        return data;
      })
      .then(events => dispatch(eventsFetchDataSuccess(events)))
      .catch(() => dispatch(eventsHasErrored(true)));
  };
}

export function eventsLocation(location) {
  return {
    type: Actions.EVENTS_UPDATE_LOCATION,
    location
  };
}

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

export function eventsFetchData(url) {
  return dispatch => {
    dispatch(eventsIsLoading(true));

    return fetch(url)
      .then(res => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        dispatch(eventsIsLoading(false));
        return res.json();
      })
      .then(body => dispatch(eventsFetchDataSuccess(body)))
      .catch(() => dispatch(eventsHasErrored(true)));
  };
}

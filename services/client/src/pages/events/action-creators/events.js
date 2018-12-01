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

export function eventsFetchData(url, params) {
  return dispatch => {
    dispatch(eventsIsLoading(true));

    const eventsURL = `${url}?page=${params.page}&location=${params.location}`;

    return fetch(eventsURL)
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

export function eventsLocation(location) {
  return {
    type: Actions.EVENTS_UPDATE_LOCATION,
    location
  };
}

import { connect } from "react-redux";
import Events from "./components/events";

import { eventsFetchData, eventsLocation } from "./action-creators/events";

import {
  getRecentEvents,
  getUpcomingEvents,
  isLoading,
  hasErrors,
  hasMoreItems,
  getEventsUrl,
  getEventParams,
  getEventsLocation
} from "./selectors";

const mapStateToProps = function(state) {
  return {
    upcomingEvents: getUpcomingEvents(state),
    recentEvents: getRecentEvents(state),
    hasErrors: hasErrors(state),
    isLoading: isLoading(state),
    hasMoreItems: hasMoreItems(state),
    url: getEventsUrl(state),
    params: getEventParams(state),
    location: getEventsLocation(state)
  };
};

const mapDispatchToProps = function(dispatch) {
  return {
    fetchData: (url, params) => dispatch(eventsFetchData(url, params)),
    setLocation: location => dispatch(eventsLocation(location))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Events);

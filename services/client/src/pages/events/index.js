import { connect } from "react-redux";
import Events from "./components/events";

import { eventsFetchData } from "./action-creators/events";

import {
  getRecentEvents,
  getUpcomingEvents,
  isLoading,
  hasErrors
} from "./selectors";

const mapStateToProps = function(state) {
  return {
    upcomingEvents: getUpcomingEvents(state),
    recentEvents: getRecentEvents(state),
    hasErrors: hasErrors(state),
    isLoading: isLoading(state)
  };
};

const mapDispatchToProps = function(dispatch) {
  return {
    fetchData: url => dispatch(eventsFetchData(url))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Events);

import { connect } from "react-redux";
import Events from "./components/events";
import withPagination from "../../withPagination";

import { eventsFetchData } from "./action-creators/events";

import {
  getRecentEvents,
  getUpcomingEvents,
  isLoading,
  hasErrors,
  hasMoreItems,
  page
} from "./selectors";

const mapStateToProps = function(state) {
  return {
    upcomingEvents: getUpcomingEvents(state),
    recentEvents: getRecentEvents(state),
    hasErrors: hasErrors(state),
    isLoading: isLoading(state),
    hasMoreItems: hasMoreItems(state),
    page: page(state)
  };
};

const mapDispatchToProps = function(dispatch) {
  return {
    fetchData: url => dispatch(eventsFetchData(url))
  };
};

const eventsUrl = `${process.env.REACT_APP_EVENTS_SERVICE_URL}/events`;
const PaginatedEvents = withPagination(eventsUrl)(Events);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaginatedEvents);

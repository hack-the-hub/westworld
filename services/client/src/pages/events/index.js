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
  page,
  location
} from "./selectors";

const mapStateToProps = function(state) {
  return {
    upcomingEvents: getUpcomingEvents(state),
    recentEvents: getRecentEvents(state),
    hasErrors: hasErrors(state),
    isLoading: isLoading(state),
    hasMoreItems: hasMoreItems(state),
    page: page(state),
    location: location(state)
  };
};

const mapDispatchToProps = function(dispatch) {
  return {
    fetchData: url => dispatch(eventsFetchData(url))
  };
};

const urlObject = {
  url: `${process.env.REACT_APP_EVENTS_SERVICE_URL}/events`,
  params: {
    location: "dublin"
  }
};
const PaginatedEvents = withPagination(urlObject)(Events);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaginatedEvents);

import React from "react";
import PropTypes from "prop-types";
import WayPoint from "react-waypoint";
import Spinner from "components/spinner/loading";

const Pagination = ({ isLoading, hasMoreItems, fetch, children }) => (
  <React.Fragment>
    {children}
    {hasMoreItems && <WayPoint onEnter={fetch} />}
    {isLoading && <Spinner centered={false} />}
  </React.Fragment>
);

Pagination.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  hasMoreItems: PropTypes.bool.isRequired,
  fetch: PropTypes.func.isRequired,
  children: PropTypes.isRequired
};

export default Pagination;

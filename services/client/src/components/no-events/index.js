import React from "react";
import PropTypes from "prop-types";
import styles from "./styles";

const NoEvents = ({ className, location }) => (
  <div className={`no-events ${className}`}>
    <style jsx>{styles}</style>
    {location
      ? "Sorry, this city does not appear to have any events in this period."
      : "No Events"}
  </div>
);

NoEvents.propTypes = {
  className: PropTypes.string,
  location: PropTypes.string
};

NoEvents.defaultProps = {
  location: "",
  className: ""
};

export default NoEvents;

import React from "react";
import PropTypes from "prop-types";
import { formatTitle } from "utils/format";
import styles from "./styles";

const NoEvents = ({ className, location }) => (
  <div className={`no-events ${className}`}>
    <style jsx>{styles}</style>
    {location
      ? `Sorry, ${formatTitle(
          location
        )} does not appear to have any events in this period.`
      : "No Events"}
  </div>
);

NoEvents.propTypes = {
  className: PropTypes.string,
  location: PropTypes.string.isRequired
};

NoEvents.defaultProps = {
  className: ""
};

export default NoEvents;

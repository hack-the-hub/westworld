import React from "react";
import PropTypes from "prop-types";
import styles from "./styles";

const EventSeparator = ({ id, className, content }) => (
  <div className={`event-separator ${className}`} id={id}>
    <style jsx>{styles}</style>
    <span>{content}</span>
  </div>
);

EventSeparator.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired
};

EventSeparator.defaultProps = {
  className: ""
};

export default EventSeparator;

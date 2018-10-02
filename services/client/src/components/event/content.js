import React from "react";
import PropTypes from "prop-types";
import { formatTitle } from "utils/format";
import TimeToEvent from "./time-to-event";
import EventTime from "./event-time";
import styles from "./styles/content";

const Content = ({ name, start, url, category }) => (
  <React.Fragment>
    <style jsx>{styles}</style>
    <div className="event-content">
      <a
        className="event-title-link"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {formatTitle(name)}
      </a>
    </div>
    <div className="event-time">
      <EventTime startTime={start} />
    </div>
    <div className="event-details">
      {category} &nbsp;
      <TimeToEvent startTime={start} />
    </div>
  </React.Fragment>
);

Content.propTypes = {
  name: PropTypes.string.isRequired,
  start: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired
};

export default Content;

import React from "react";
import PropTypes from "prop-types";
import { formatTitle } from "utils/format";
import TimeToEvent from "./time-to-event";
import styles from "./styles/content";

const Content = ({ name, time, eventUrl, groupName }) => (
  <React.Fragment>
    <style jsx>{styles}</style>
    <div className="event-content">
      <a
        className="event-title-link"
        href={eventUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        {formatTitle(name)}
      </a>
    </div>
    <div className="event-details">
      <span>{groupName}</span>
      <TimeToEvent startTime={time} />
    </div>
  </React.Fragment>
);

Content.propTypes = {
  name: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  eventUrl: PropTypes.string.isRequired,
  groupName: PropTypes.string.isRequired
};

export default Content;

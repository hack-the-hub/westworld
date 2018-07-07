import React from "react";
import PropTypes from "prop-types";
import styles from "./styles/content";
import TimeToVideo from "./time-to-video";
import {formatTitle} from "utils/format";

const Content = ({ name, created, url, channel }) => (
  <React.Fragment>
    <style jsx>{styles}</style>
    <div className="video-content">
      <a
        className="video-title-link"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {formatTitle(name)}
      </a>
    </div>
    <div className="video-details">
      <span>{channel}</span>
      <TimeToVideo startTime={created}/>
    </div>
  </React.Fragment>
);

Content.propTypes = {
  name: PropTypes.string.isRequired,
  created: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  channel: PropTypes.string.isRequired
};

export default Content;

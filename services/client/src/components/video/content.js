import React from "react";
import PropTypes from "prop-types";
import { formatTitle } from "utils/format";
import styles from "./styles/content";
import TimeToVideo from "./time-to-video";

const Content = ({ name, created, url, channel }) => {
  const channelNames = channel.map(ch => (
    <span key={ch.id}>{`${ch.name} `}</span>
  ));

  return (
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
        {channelNames}
        <TimeToVideo created={created} />
      </div>
    </React.Fragment>
  );
};

Content.propTypes = {
  name: PropTypes.string.isRequired,
  created: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  channel: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired
};

export default Content;

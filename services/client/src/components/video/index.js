import React from "react";
import PropTypes from "prop-types";
import Icon from "./icon";
import Content from "./content";
import styles from "./styles";

const Video = ({ className, content }) => {
  const { source } = content;

  return (
    <div className={`video ${className}`}>
      <style jsx>{styles}</style>
      <div className="video-icon">
        <Icon source={source} />
      </div>
      <div className="video-content">
        <Content {...content} />
      </div>
    </div>
  );
};

Video.propTypes = {
  className: PropTypes.string,
  content: PropTypes.shape({
    name: PropTypes.string.isRequired,
    created: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    channel: PropTypes.shape({
      name: PropTypes.string.isRequired
    }),
    source: PropTypes.string.isRequired
  }).isRequired
};

Video.defaultProps = {
  className: ""
};

export default Video;

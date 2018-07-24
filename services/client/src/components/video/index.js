import React from "react";
import PropTypes from "prop-types";
import Icon from "./icon";
import Content from "./content";
import styles from "./styles";

const Video = ({ className, content }) => {
  const { id, source } = content;

  return (
    <div className={`video ${className}`}>
      <style jsx>{styles}</style>
      <div className="video-icon">
        <Icon source={source} />
      </div>
      <div className="video-content">
        <Content key={id} {...content} />
      </div>
    </div>
  );
};

Video.propTypes = {
  className: PropTypes.string,
  content: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    created: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    channel: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
      }).isRequired
    ),
    source: PropTypes.string.isRequired
  }).isRequired
};

Video.defaultProps = {
  className: ""
};

export default Video;

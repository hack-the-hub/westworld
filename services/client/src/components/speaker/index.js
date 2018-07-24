import React from "react";
import PropTypes from "prop-types";
import Content from "./content";
import styles from "./styles";

const Speaker = ({ className, content }) => {
  const { name, avatar } = content;

  return (
    <div className={`speaker ${className}`}>
      <style jsx>{styles}</style>
      <div className="speaker-icon">
        <img src={avatar} alt={`${name}`} />
      </div>
      <div className="speaker-content">
        <Content {...content} />
      </div>
    </div>
  );
};

Speaker.propTypes = {
  className: PropTypes.string,
  content: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    topics: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
      })
    ).isRequired,
    diversification: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
      })
    ).isRequired,
    contact: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired
  }).isRequired
};

Speaker.defaultProps = {
  className: ""
};

export default Speaker;

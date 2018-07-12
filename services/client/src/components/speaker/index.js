import React from "react";
import PropTypes from "prop-types";
import Content from "./content";
import styles from "./styles";

const Speaker = ({ className, content }) => {
  const { name, image } = content;

  return (
    <div className={`speaker ${className}`}>
      <style jsx>{styles}</style>
      <div className="speaker-icon">
        <img src={image} alt={`${name}`} />
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
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    topics: PropTypes.arrayOf(PropTypes.string).isRequired,
    diversification: PropTypes.arrayOf(PropTypes.string).isRequired,
    contact: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired
  }).isRequired
};

Speaker.defaultProps = {
  className: ""
};

export default Speaker;

import React from "react";
import PropTypes from "prop-types";
import Content from "./content";
import styles from "./styles";

const Developers = ({ className, content }) => {
  const { name, avatar } = content;

  return (
    <div className={`developer ${className}`}>
      <style jsx>{styles}</style>
      <div className="developer-icon">
        <img src={avatar} alt={`${name}`} />
      </div>
      <div className="developer-content">
        <Content {...content} />
      </div>
    </div>
  );
};

Developers.propTypes = {
  className: PropTypes.string,
  content: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    contact: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired
  }).isRequired
};

Developers.defaultProps = {
  className: ""
};

export default Developers;

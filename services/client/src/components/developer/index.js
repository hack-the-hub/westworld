import React from "react";
import PropTypes from "prop-types";
import Content from "./content";
import styles from "./styles";

const Developers = ({ className, content }) => {
  const { avatar, login } = content;

  return (
    <div className={`developer ${className}`}>
      <style jsx>{styles}</style>
      <div className="developer-icon">
        <img src={avatar} alt={`https://github.com/${login}`} />
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
    login: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    gists: PropTypes.number.isRequired,
    repositories: PropTypes.number.isRequired,
    bio: PropTypes.string.isRequired,
    blog: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired
  }).isRequired
};

Developers.defaultProps = {
  className: ""
};

export default Developers;

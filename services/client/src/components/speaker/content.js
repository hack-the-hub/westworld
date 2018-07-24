import React from "react";
import PropTypes from "prop-types";
import { formatTitle } from "utils/format";
import styles from "./styles/content";

const Content = ({ name, role, topics, contact }) => (
  <React.Fragment>
    <style jsx>{styles}</style>
    <div className="speaker-content">
      <a
        className="speaker-title-link"
        href={contact}
        target="_blank"
        rel="noopener noreferrer"
      >
        {formatTitle(name)} <span>@{contact}</span>
      </a>
    </div>
    <div className="speaker-subtitle">{formatTitle(role)}</div>
    <div className="speaker-details">
      <div className="speaker-tags">
        {topics.map(topic => (
          <span key={topic.id}>{formatTitle(topic.name)}</span>
        ))}
      </div>
    </div>
  </React.Fragment>
);

Content.propTypes = {
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  topics: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  contact: PropTypes.string.isRequired
};

export default Content;

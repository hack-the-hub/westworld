import React from "react";
import PropTypes from "prop-types";
import { formatTitle } from "utils/format";
import styles from "./styles/content";

const Content = ({
  login,
  name,
  bio,
  repositories,
  gists,
  blog,
  company,
  location
}) => (
  <React.Fragment>
    <style jsx>{styles}</style>
    <div className="developer-content">
      <a
        className="developer-title-link"
        href={name}
        target="_blank"
        rel="noopener noreferrer"
      >
        {login}
      </a>
    </div>
    <div className="developer-subtitle">
      {formatTitle(name)} {company}
    </div>
    <div className="developer-details">{bio}</div>
    <div className="developer-blog">
      <i className="fa fa-blog" alt="Event icon" />
      {blog}
    </div>
    <div className="developer-location">
      <i className="fa fa-location-arrow" alt="Event icon" />
      &nbsp; {location}
    </div>
    <div className="developer-repos">
      <i className="fa fa-github" alt="Event icon" />
      <span> Public Repos: {repositories}</span>
      <span> Public Gists: {gists}</span>
    </div>
  </React.Fragment>
);

Content.propTypes = {
  login: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  gists: PropTypes.number.isRequired,
  repositories: PropTypes.number.isRequired,
  bio: PropTypes.string.isRequired,
  blog: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired
};

export default Content;

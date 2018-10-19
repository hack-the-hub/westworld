import React from "react";
import PropTypes from "prop-types";
import { formatTitle, formatAvatar } from "utils/format";
import styles from "./styles/content";
import Blog from "./blog";
import Company from "./company";
import Stats from "./github";

const Content = ({ login, name, bio, repositories, gists, blog, company }) => (
  <React.Fragment>
    <style jsx>{styles}</style>
    <div className="developer-content">
      {formatTitle(name)} &nbsp;
      <a
        className="developer-title"
        href={`https://github.com/${login}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {formatAvatar(login)}
      </a>
    </div>
    <div className="developer-bio">{bio}</div>
    <div className="developer-content">
      <Company company={company} />
      <Blog blog={blog} />
      <Stats repositories={repositories} gists={gists} />
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
  company: PropTypes.string.isRequired
};

export default Content;

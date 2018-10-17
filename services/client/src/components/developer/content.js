import React from "react";
import PropTypes from "prop-types";
import { formatTitle, formatAvatar } from "utils/format";
import styles from "./styles/content";

const Content = ({ login, name, bio, repositories, gists, blog, company }) => (
  <React.Fragment>
    <style jsx>{styles}</style>
    <div className="developer-content">
      {formatTitle(name)} &nbsp;
      <a
        className="developer-title-link"
        href={`https://github.com/${login}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {formatAvatar(login)}
      </a>
    </div>
    <div className="developer-bio">{bio}</div>
    <div className="developer-blog">
      <i className="fa fa-building" alt="Work icon" />
      <span>
        &nbsp;
        {company}
      </span>
    </div>
    <div className="developer-blog">
      <i className="fa fa-sitemap" alt="Browser icon" />
      <span>
        &nbsp;
        <a href={blog} target="_blank" rel="noopener noreferrer">
          {blog}
        </a>
      </span>
    </div>
    <div className="developer-repos">
      <i className="fa fa-github" alt="Github icon" />
      <span>
        {" "}
        Public Repositories: {repositories} | Public Gists: {gists}
      </span>
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

import React from "react";
import PropTypes from "prop-types";
import FontAwesome from "react-fontawesome";
import _ from "lodash";
import styles from "./styles/content";

const Blog = ({ blog }) => {
  if (_.isEmpty(blog)) return null;

  return (
    <React.Fragment>
      <style jsx>{styles}</style>
      <span>
        <FontAwesome name="sitemap" />
        <a href={blog} target="_blank" rel="noopener noreferrer">
          {` ${blog}`}
        </a>
      </span>
    </React.Fragment>
  );
};

Blog.propTypes = {
  blog: PropTypes.string.isRequired
};

export default Blog;

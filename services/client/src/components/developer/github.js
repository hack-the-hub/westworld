import React from "react";
import PropTypes from "prop-types";
import FontAwesome from "react-fontawesome";
import styles from "./styles/content";

const Stats = ({ repositories, gists }) => {
  const publicRepositories = repositories || 0;
  const publicGists = gists || 0;

  return (
    <React.Fragment>
      <style jsx>{styles}</style>
      <span>
        <FontAwesome name="github" />
        {` Public Repositories: `}
        <strong>{publicRepositories}</strong>
      </span>
      <span>
        <FontAwesome name="github" />
        {` Public Gists: `}
        <strong>{publicGists}</strong>
      </span>
    </React.Fragment>
  );
};

Stats.propTypes = {
  gists: PropTypes.number.isRequired,
  repositories: PropTypes.number.isRequired
};

export default Stats;

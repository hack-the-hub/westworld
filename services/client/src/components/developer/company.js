import React from "react";
import PropTypes from "prop-types";
import FontAwesome from "react-fontawesome";
import _ from "lodash";
import styles from "./styles/content";

const Company = ({ company }) => {
  if (_.isEmpty(company)) return null;

  return (
    <React.Fragment>
      <style jsx>{styles}</style>
      <span>
        <FontAwesome name="building" />
        {` ${company}`}
      </span>
    </React.Fragment>
  );
};

Company.propTypes = {
  company: PropTypes.string.isRequired
};

export default Company;

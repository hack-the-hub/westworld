import React from "react";
import PropTypes from "prop-types";
import styles from "./styles";

const Spinner = ({ centered }) => (
  <React.Fragment>
    <style jsx>{styles}</style>
    <div
      className={`loading-container ${
        centered ? "loading-container_centered" : ""
      }`}
    >
      <div className="lds-ripple">
        <div />
        <div />
      </div>
    </div>
  </React.Fragment>
);

Spinner.defaultProps = {
  centered: true
};

Spinner.propTypes = {
  centered: PropTypes.bool
};

export default Spinner;

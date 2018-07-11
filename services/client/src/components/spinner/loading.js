import React from "react";
import styles from "./styles";

const Spinner = () => {
  return (
    <React.Fragment>
      <style jsx>{styles}</style>
      <div className="loading-container">
        <div className="lds-ripple">
          <div></div>
          <div></div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Spinner;

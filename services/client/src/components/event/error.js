import React from "react";
import styles from "./styles/error";

const Error = () => (
  <React.Fragment>
    <style jsx>{styles}</style>
    <div className="content-error">
      <div className="error-seperator">Oops! Theres a problem</div>
      <div className="event-error">
        <p>Sorry! Looks like something went wrong whilst loading the events.</p>
      </div>
    </div>
  </React.Fragment>
);

export default Error;

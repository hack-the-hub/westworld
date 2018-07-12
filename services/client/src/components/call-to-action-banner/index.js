import React from "react";
import styles from "./styles";

const CallToActionBanner = () => (
  <div className="banner">
    <style jsx>{styles}</style>
    <span>What else would you like to see here?</span>
    <a
      href="https://github.com/apoclyps/my-dev-space/issues"
      target="_blank"
      rel="noopener noreferrer"
    >
      Make a request
    </a>
  </div>
);

export default CallToActionBanner;

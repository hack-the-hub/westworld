import React from "react";
import { Link } from "react-router-dom";

const ctaMessage = {
  paddingRight: "0.5em"
};

class CallToActionBanner extends React.Component {
  render() {
    return (
      <div className="bg-grey-lightest border border-grey-lightest p-4 shadow-light text-center text-sm">
        <span style={ctaMessage}>What else would you like seen here?</span>
        <Link
          className="text-blue"
          href="https://github.com/apoclyps/my-dev-space/issues"
          target="_blank"
          rel="noopener noreferrer"
        >
          Make a request
        </Link>
      </div>
    );
  }
}

export default CallToActionBanner;

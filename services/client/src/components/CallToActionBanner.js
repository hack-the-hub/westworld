import React from "react";

class CallToActionBanner extends React.Component {
  render() {
    const ctaMessage = {
      paddingRight: "0.5em"
    };
    return (
      <div className="bg-grey-lightest border border-grey-lightest p-4 shadow-light text-center text-sm">
        <span style={ctaMessage}>What else would you like seen here?</span>
        <a
          className="text-blue"
          href="https://github.com/apoclyps/my-dev-space/issues"
          target="_blank"
          rel="noopener noreferrer"
        >
          Make a request
        </a>
      </div>
    );
  }
}

export default CallToActionBanner;

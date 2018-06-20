import React from "react";

class Footer extends React.Component {
  render() {
    return (
      <div className="bg-blue lg:mb-4 p-2 rounded-b text-xs text-white">
        <div>
          &copy; 2018 | Site by
          <a
            className="bg-blue text-white rounded no-underline p-1"
            href="https://twitter.com/apoclyps"
          >
            <i className="fa fa-twitter" /> Kyle Harrison
          </a>
        </div>
      </div>
    );
  }
}

export default Footer;

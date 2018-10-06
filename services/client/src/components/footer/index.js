import React from "react";
import FontAwesome from "react-fontawesome";
import styles from "./styles";

const Footer = () => (
  <div className="footer">
    <style jsx>{styles}</style>
    <div>
      &copy; 2018 |
      <a href={`${process.env.REACT_APP_EVENTS_SERVICE_URL}/swagger`}>
        <FontAwesome name="book" />
        {" API"}
      </a>
      | Built by
      <a href="https://github.com/apoclyps/my-dev-space/graphs/contributors">
        <FontAwesome name="github" />
        {" open source contributions"}
      </a>
    </div>
  </div>
);

export default Footer;

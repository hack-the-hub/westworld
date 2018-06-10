import React, { Component } from "react";
import CallToActionBanner from "../components/CallToActionBanner";
import Content from "../components/Content";
import Pagination from "../components/Pagination";

class Developers extends Component {
  render() {
    return (
      <div>
        <CallToActionBanner />
        <Content />
        <Pagination />
      </div>
    );
  }
}

export default Developers;

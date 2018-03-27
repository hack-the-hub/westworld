import React, { Component } from "react";

class Breadcrumb extends Component {
  render() {
    return (
      <section className="parallax-section" data-scrollax-parent="true">
        <div
          className="bg par-elem "
          data-bg="images/bg/1.jpg"
          data-scrollax="properties: { translateY: '30%' }"
        />
      </section>
    );
  }
}

export default Breadcrumb;

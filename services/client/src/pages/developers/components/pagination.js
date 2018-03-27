import React, { Component } from "react";

class Pagination extends Component {
  render() {
    return (
      <div className="pagination">
        <a href="#" className="prevposts-link">
          <i className="fa fa-caret-left" />
        </a>
        <a href="#" className="blog-page current-page transition">
          1
        </a>
        <a href="#" className="blog-page transition">
          2
        </a>
        <a href="#" className="blog-page transition">
          3
        </a>
        <a href="#" className="blog-page transition">
          4
        </a>
        <a href="#" className="nextposts-link">
          <i className="fa fa-caret-right" />
        </a>
      </div>
    );
  }
}

export default Pagination;

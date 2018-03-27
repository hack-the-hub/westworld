import React, { Component } from "react";
import { Link } from "react-router-dom";

class Description extends Component {
  render() {
    const { name, description } = this.props.meetup;
    return (
      <div className="list-single-main-item fl-wrap">
        <div className="list-single-main-item-title fl-wrap">
          <h3>{name}</h3>
        </div>
        <p>{description}</p>
        <span className="fw-separator" />
        <div className="list-single-main-item-title fl-wrap">
          <h3>Skills</h3>
        </div>
        <div className="listing-features fl-wrap">
          <ul>
            <li>
              <i className="fa fa-rocket" />
              Java
            </li>
            <li>
              <i className="fa fa-wifi" />
              Python
            </li>
            <li>
              <i className="fa fa-motorcycle" />
              Javascript
            </li>
            <li>
              <i className="fa fa-cloud" />
              React
            </li>
            <li>
              <i className="fa fa-cloud" />
              AWS Services
            </li>
            <li>
              <i className="fa fa-cloud" />
              HTML5 & CSS3
            </li>
          </ul>
        </div>
        <span className="fw-separator" />
        <div className="list-single-main-item-title fl-wrap">
          <h3>Tags</h3>
        </div>
        <div className="list-single-tags tags-stylwrap">
          <Link to="/">Software Engineer</Link>
          <Link to="/">Stem Ambassador</Link>
          <Link to="/">Event Organiser</Link>
        </div>
      </div>
    );
  }
}

export default Description;

import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./stylesheet/index.css";

class FeaturedMeetupCard extends Component {
  renderDescription(description) {
    if (!description) return null;

    const text = description.substring(1, 10);
    return <span>{text}...</span>;
  }

  render() {
    const { id, name, description, technology, role, image } = this.props;

    return (
      <div className="gallery-item">
        <div className="grid-item-holder">
          <div className="listing-item-grid meetup-image">
            <img src={image} alt="" />
            <div className="listing-counter">
              Technology: <span>{technology} </span> {role}
            </div>
            <div className="listing-item-cat">
              <h3>
                <Link to={`/developer/${id}`}>{name}</Link>
              </h3>
              <p>{this.renderDescription(description)}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FeaturedMeetupCard;

import React, { Component } from "react";
import { Link } from "react-router-dom";

class FeaturedLanguagesCard extends Component {
  render() {
    const { id, image } = this.props;

    return (
      <div className="gallery-item">
        <div className="grid-item-holder">
          <div className="listing-item-grid item-grid-language">
            <img src={image} alt="" />
          </div>
        </div>
      </div>
    );
  }
}

export default FeaturedLanguagesCard;

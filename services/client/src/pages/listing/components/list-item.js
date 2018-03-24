import React, {Component} from "react";

import {Link} from "react-router-dom";

class ListSearchInput extends Component {
  render() {
    const { id, name, type, creator, description, reviews, address, image} = this.props;

    return (
      <div className="listing-item">
      <article className="geodir-category-listing fl-wrap">
        <div className="geodir-category-img">
          <img src={image} alt=""/>
          <div className="overlay"/>
          <div className="list-post-counter">
            <span>
              {id}
            </span>
            <i className="fa fa-heart"/>
          </div>
        </div>
        <div className="geodir-category-content fl-wrap">
          <a className="listing-geodir-category" href="listing.html">
            {type}
          </a>
          <div className="listing-avatar">
            <Link to={`/developer/${id}`}>
              <img src="images/avatar/1.jpg" alt=""/>
            </Link>
            <span className="avatar-tooltip">
              Added By
              <strong>
                {creator}
              </strong>
            </span>
          </div>
          <h3>
            <Link to={`/developer/${id}`}>
              {name}
            </Link>
          </h3>
          <p>
            {description}
          </p>
          <div className="geodir-category-options fl-wrap">
            <div className="listing-rating card-popup-rainingvis" data-starrating2="5">
              <span>
                ({reviews} reviews)
              </span>
            </div>
            <div className="geodir-category-location">
              <a href="#">
                <i className="fa fa-map-marker" aria-hidden="true"/>
                {address}
              </a>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
  }
}

export default ListSearchInput;

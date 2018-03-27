import React, { Component } from "react";
import { Link } from "react-router-dom";

import FeaturedDeveloperCard from "./featured-developer-card";

class FeaturedDevelopers extends Component {
  renderDeveloper(featuredDevelopers) {
    return featuredDevelopers.map(function(el) {
      const { id, name, description, technology, role, image, title } = el;
      return (
        <FeaturedDeveloperCard
          key={id}
          id={id}
          title={title}
          name={name}
          description={description}
          technology={technology}
          role={role}
          image={image}
        />
      );
    });
  }

  render() {
    const { featuredDevelopers } = this.props;
    return (
      <section id="featured-developer-section">
        <div className="container">
          <div className="section-title">
            <h2>Featured Developers</h2>
            <div className="section-subtitle">Featured Developers</div>
            <span className="section-separator" />
            <p>
              Meet some of the most influential developers in the Belfast area!
            </p>
          </div>
          <div className="gallery-items fl-wrap mr-bot spad">
            {this.renderDeveloper(featuredDevelopers)}
          </div>
          <Link
            to="/developers"
            className="btn big-btn circle-btn dec-btn color-bg flat-btn"
          >
            View All <i className="fa fa-eye" />
          </Link>
        </div>
      </section>
    );
  }
}

export default FeaturedDevelopers;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import FeaturedLanguageCard from './featured-language-card';

class FeaturedLanguages extends Component {
  renderLanguage(featuredLanguages) {
    return featuredLanguages.map(el => {
      const { id, image } = el;
      return <FeaturedLanguageCard key={id} id={id} image={image} />;
    });
  }

  render() {
    const { featuredLanguages } = this.props;
    return (
      <section id='featured-developer-section'>
        <div className='container'>
          <div className='section-title'>
            <h2>Featured Languages</h2>
            <div className='section-subtitle'>Featured Languages</div>
            <span className='section-separator' />
            <p>
              Meet some of the most influential developers in the Belfast area!
            </p>
          </div>
          <div className='gallery-items fl-wrap mr-bot spad'>
            {this.renderLanguage(featuredLanguages)}
          </div>
          <Link
            to='/developers'
            className='btn big-btn circle-btn dec-btn color-bg flat-btn'
          >
            View All <i className='fa fa-eye' />
          </Link>
        </div>
      </section>
    );
  }
}

export default FeaturedLanguages;

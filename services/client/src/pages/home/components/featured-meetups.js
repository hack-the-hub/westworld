import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import FeaturedMeetupCard from './featured-meetup-card';

class FeaturedMeetups extends Component {

  static propTypes = {
    featuredMeetups: PropTypes.array.isRequired
  };

  renderMeetups(featuredMeetups) {
    return featuredMeetups.map(el => {
      const {id, name, description, technology, image} = el;
      return (
        <FeaturedMeetupCard
          key={id}
          id={id}
          name={name}
          description={description}
          technology={technology}
          image={image}
        />
      );
    });
  }

  render() {
    const {featuredMeetups} = this.props;
    return (
      <section id='featured-meetup-section'>
        <div className='container'>
          <div className='section-title'>
            <h2>Featured Meetups</h2>
            <div className='section-subtitle'>Featured Meetups</div>
            <span className='section-separator' />
            <p>
              Discover the most populate meetup groups with upcoming events!
            </p>
          </div>
          <div className='gallery-items fl-wrap mr-bot spad'>
            {this.renderMeetups(featuredMeetups)}
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

export default FeaturedMeetups;

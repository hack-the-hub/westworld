import React, {Component} from 'react';

import Header from 'components/layout/header';
import Footer from 'components/layout/footer';
import FeaturedDevelopers from './components/featured-developers';
import FeaturedMeetups from './components/featured-meetups';
import FeaturedLanguages from './components/featured-languages';
import Question from './components/question';

import {
  featuredMeetups,
  featuredLanguages,
  featuredDevelopers
} from '../../data';

class HomePage extends Component {
  render() {
    return (
      <div>
        <div id='main'>
          <Header {...this.props} />

          <div id='wrapper'>
            <div className='content'>
              <FeaturedDevelopers featuredDevelopers={featuredDevelopers} />

              <FeaturedLanguages featuredLanguages={featuredLanguages} />

              <FeaturedMeetups featuredMeetups={featuredMeetups} />

              <Question />
            </div>
          </div>

          <Footer />

          <a className='to-top'>
            <i className='fa fa-angle-up' />
          </a>
        </div>
      </div>
    );
  }
}

export default HomePage;

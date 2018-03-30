import React, {Component} from 'react';
import PropTypes from 'prop-types';

class FeaturedLanguagesCard extends Component {
  static propTypes = {
    image: PropTypes.string.isRequired
  };

  render() {
    const {image} = this.props;

    return (
      <div className='gallery-item'>
        <div className='grid-item-holder'>
          <div className='listing-item-grid item-grid-language'>
            <img src={image} alt='' />
          </div>
        </div>
      </div>
    );
  }
}

export default FeaturedLanguagesCard;

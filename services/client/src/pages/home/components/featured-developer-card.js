import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

class FeaturedDeveloperCard extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
  };

  renderDescription(description) {
    if (!description) return null;

    const text = description.substring(1, 10);
    return <span>{text}...</span>;
  }

  render() {
    const {id, name, title, image} = this.props;

    return (
      <div className='gallery-item'>
        <div className='grid-item-holder'>
          <div className='listing-item-grid'>
            <img src={image} alt='' />
            <div className='listing-counter'>
              <span>{title} </span>
            </div>
            <div className='listing-item-cat'>
              <h3>
                <Link to={`/developer/${id}`}>{name}</Link>
              </h3>
              <p>{this.renderDescription()}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FeaturedDeveloperCard;

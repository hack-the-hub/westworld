import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import './stylesheet/index.css';

class ListSearchInput extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    creator: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
  };

  renderDescription(description) {
    if (!description) return null;

    const text = description.substring(0, 200);
    return <span className='list-search-input-description'>{text}...</span>;
  }

  render() {
    const {id, name, creator, description, image} = this.props;

    return (
      <div className='listing-item'>
        <article className='geodir-category-listing fl-wrap'>
          <div className='geodir-category'>
            <Link to={`/meetup/${id}`}>
              <img className='item-grid-meetup' src={image} alt='' />
            </Link>
          </div>
          <div className='geodir-category-content fl-wrap'>
            <div className='listing-avatar'>
              <Link to={`/meetup/${id}`}>
                <img
                  className='item-grid-language'
                  src='images/avatar/1.jpg'
                  alt=''
                />
              </Link>
              <span className='avatar-tooltip'>
                Added By
                <strong>{creator}</strong>
              </span>
            </div>
            <h3>
              <Link to={`/meetup/${id}`}>{name}</Link>
            </h3>
            <p>{this.renderDescription(description)}</p>
          </div>
        </article>
      </div>
    );
  }
}

export default ListSearchInput;

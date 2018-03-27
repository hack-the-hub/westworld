import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ListSearchInput extends Component {
  renderDescription(description) {
    if (!description) return null;

    const text = description.substring(0, 200);
    return <span className='list-search-input-description'>{text}...</span>;
  }

  render() {
    const { id, name, role, image } = this.props;

    return (
      <div className='listing-item'>
        <article className='geodir-category-listing fl-wrap'>
          <div className='geodir-category-img'>
            <Link to={`/developer/${id}`}>
              <img src={image} alt='' />
            </Link>
          </div>
          <div className='geodir-category-content fl-wrap'>
            <h3>
              <Link to={`/developer/${id}`}>{name}</Link>
            </h3>
            <p className=''>{role}</p>
          </div>
        </article>
      </div>
    );
  }
}

export default ListSearchInput;

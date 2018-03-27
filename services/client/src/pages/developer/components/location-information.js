import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LocationInformation extends Component {
  render() {
    const { image, website } = this.props.developer;

    return (
      <div className='box-widget-item fl-wrap'>
        <div className='box-widget'>
          <div>
            <img className='profile-image-container' src={image} alt='' />
          </div>
          <div className='box-widget-content'>
            <div className='list-author-widget-contacts list-item-widget-contacts'>
              <ul>
                <li>
                  <span>
                    <i className='fa fa-map-marker' />
                    Address :
                  </span>
                  <Link to='/'>Belfast</Link>
                </li>
                <li>
                  <span>
                    <i className='fa fa-globe' />
                    Website :
                  </span>
                  <Link to='/'>{website}</Link>
                </li>
              </ul>
            </div>
            <div className='list-widget-social'>
              <ul>
                <li>
                  <Link to='/'>
                    <i className='fa fa-facebook' />
                  </Link>
                </li>
                <li>
                  <Link to='/'>
                    <i className='fa fa-twitter' />
                  </Link>
                </li>
                <li>
                  <Link to='/'>
                    <i className='fa fa-vk' />
                  </Link>
                </li>
                <li>
                  <Link to='/'>
                    <i className='fa fa-whatsapp' />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LocationInformation;

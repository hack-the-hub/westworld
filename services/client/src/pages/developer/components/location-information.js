import React, { Component } from "react";

class LocationInformation extends Component {
  render() {
    console.log(this.props);
    const { image, website } = this.props.listing;

    return (
      <div className="box-widget-item fl-wrap">
        <div className="box-widget">
          <div>
            <img className="profile-image-container" src={image} alt="" />
          </div>
          <div className="box-widget-content">
            <div className="list-author-widget-contacts list-item-widget-contacts">
              <ul>
                <li>
                  <span>
                    <i className="fa fa-map-marker" />
                    Address :
                  </span>
                  <a href="#">Belfast</a>
                </li>
                <li>
                  <span>
                    <i className="fa fa-globe" />
                    Website :
                  </span>
                  <a href="#">{website}</a>
                </li>
              </ul>
            </div>
            <div className="list-widget-social">
              <ul>
                <li>
                  <a href="#" target="_blank">
                    <i className="fa fa-facebook" />
                  </a>
                </li>
                <li>
                  <a href="#" target="_blank">
                    <i className="fa fa-twitter" />
                  </a>
                </li>
                <li>
                  <a href="#" target="_blank">
                    <i className="fa fa-vk" />
                  </a>
                </li>
                <li>
                  <a href="#" target="_blank">
                    <i className="fa fa-whatsapp" />
                  </a>
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

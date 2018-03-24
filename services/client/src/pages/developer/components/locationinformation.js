import React, { Component } from "react";

class LocationInformation extends Component {
    render() {
        return (
            <div className="box-widget-item fl-wrap">
                <div className="box-widget-item-header">
                    <h3>Location / Contacts :</h3>
                </div>
                <div className="box-widget">
                    <div className="map-container">
                        <div
                            id="singleMap"
                            data-latitude="40.7427837"
                            data-longitude="-73.11445617675781"
                            data-mapTitle="Our Location"
                        />
                    </div>
                    <div className="box-widget-content">
                        <div className="list-author-widget-contacts list-item-widget-contacts">
                            <ul>
                                <li>
                                    <span>
                                        <i className="fa fa-map-marker" />
                                        Adress :
                                    </span>
                                    <a href="#">USA 27TH Brooklyn NY</a>
                                </li>
                                <li>
                                    <span>
                                        <i className="fa fa-phone" />
                                        Phone :
                                    </span>
                                    <a href="#">+7(123)987654</a>
                                </li>
                                <li>
                                    <span>
                                        <i className="fa fa-envelope-o" />
                                        Mail :
                                    </span>
                                    <a href="#">AlisaNoory@domain.com</a>
                                </li>
                                <li>
                                    <span>
                                        <i className="fa fa-globe" />
                                        Website :
                                    </span>
                                    <a href="#">themeforest.net</a>
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

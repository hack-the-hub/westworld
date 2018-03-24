import React, { Component } from "react";

class Description extends Component {
    render() {
        const {name, description} = this.props.listing;
        return (
            <div className="list-single-main-item fl-wrap">
                <div className="list-single-main-item-title fl-wrap">
                    <h3>{name}</h3>
                </div>
                <p>
                    {description}
                </p>
                <span className="fw-separator" />
                <div className="list-single-main-item-title fl-wrap">
                    <h3>Amenities</h3>
                </div>
                <div className="listing-features fl-wrap">
                    <ul>
                        <li>
                            <i className="fa fa-rocket" />
                            Elevator in building
                        </li>
                        <li>
                            <i className="fa fa-wifi" />
                            Free Wi Fi
                        </li>
                        <li>
                            <i className="fa fa-motorcycle" />
                            Free Parking
                        </li>
                        <li>
                            <i className="fa fa-cloud" />
                            Air Conditioned
                        </li>
                        <li>
                            <i className="fa fa-shopping-cart" />
                            Online Ordering
                        </li>
                        <li>
                            <i className="fa fa-paw" />
                            Pet Friendly
                        </li>
                        <li>
                            <i className="fa fa-tree" />
                            Outdoor Seating
                        </li>
                        <li>
                            <i className="fa fa-wheelchair" />
                            Wheelchair Friendly
                        </li>
                    </ul>
                </div>
                <span className="fw-separator" />
                <div className="list-single-main-item-title fl-wrap">
                    <h3>Tags</h3>
                </div>
                <div className="list-single-tags tags-stylwrap">
                    <a href="#">Hotel</a>
                    <a href="#">Hostel</a>
                    <a href="#">Room</a>
                    <a href="#">Spa</a>
                    <a href="#">Restourant</a>
                    <a href="#">Parking</a>
                </div>
            </div>
        );
    }
}

export default Description;

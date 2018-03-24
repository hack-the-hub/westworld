import React, { Component } from "react";

class Description extends Component {
    render() {
        return (
            <div className="list-single-main-item fl-wrap">
                <div className="list-single-main-item-title fl-wrap">
                    <h3>About Hotel</h3>
                </div>
                <p>
                    Ut euismod ultricies sollicitudin. Curabitur sed dapibus
                    nulla. Nulla eget iaculis lectus. Mauris ac maximus neque.
                    Nam in mauris quis libero sodales eleifend. Morbi varius,
                    nulla sit amet rutrum elementum, est elit finibus tellus, ut
                    tristique elit risus at metus.
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Maecenas in pulvinar neque. Nulla finibus lobortis pulvinar.
                    Donec a consectetur nulla. Nulla posuere sapien vitae lectus
                    suscipit, et pulvinar nisi tincidunt. Aliquam erat volutpat.
                    Curabitur convallis fringilla diam sed aliquam. Sed tempor
                    iaculis massa faucibus feugiat. In fermentum facilisis
                    massa, a consequat purus viverra.
                </p>
                <a href="#" className="btn transparent-btn float-btn">
                    Visit Website
                    <i className="fa fa-angle-right" />
                </a>
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

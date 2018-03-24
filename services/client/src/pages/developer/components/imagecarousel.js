import React, { Component } from "react";
import PropTypes from "prop-types";

import Header from "components/layout/header";
import Footer from "components/layout/footer";
import GenericNotFound from "components/errors/genericnotfound";

class ImageCarousel extends Component {
    render() {
        return (
            <div className="list-single-carousel-wrap fl-wrap" id="sec1">
                <div className="fw-carousel fl-wrap full-height lightgallery">
                    <div className="slick-slide-item">
                        <div className="box-item">
                            <img
                                src="https://www.wellingtonparkhotel.com/cmsGallery/photo/1772/resized/1400x900/dermot_murphy_photography_51.jpg"
                                alt=""
                            />
                            <a
                                href="https://www.wellingtonparkhotel.com/cmsGallery/photo/1772/resized/1400x900/dermot_murphy_photography_51.jpg"
                                className="gal-link popup-image"
                            >
                                <i className="fa fa-search" />
                            </a>
                        </div>
                    </div>

                    <div className="slick-slide-item">
                        <div className="box-item">
                            <img
                                src="https://www.wellingtonparkhotel.com/cmsGallery/photo/1776/resized/800x600/45_1.jpg"
                                alt=""
                            />
                            <a
                                href="https://www.wellingtonparkhotel.com/cmsGallery/photo/1776/resized/800x600/45_1.jpg"
                                className="gal-link popup-image"
                            >
                                <i className="fa fa-search" />
                            </a>
                        </div>
                    </div>

                    <div className="slick-slide-item">
                        <div className="box-item">
                            <img
                                src="https://www.wellingtonparkhotel.com/cmsGallery/photo/1772/resized/1400x900/wph_mcwilliam_suite.jpg"
                                alt=""
                            />
                            <a
                                href="https://www.wellingtonparkhotel.com/cmsGallery/photo/1772/resized/1400x900/wph_mcwilliam_suite.jpg"
                                className="gal-link popup-image"
                            >
                                <i className="fa fa-search" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="swiper-button-prev sw-btn">
                    <i className="fa fa-long-arrow-left" />
                </div>
                <div className="swiper-button-next sw-btn">
                    <i className="fa fa-long-arrow-right" />
                </div>
            </div>
        );
    }
}

export default ImageCarousel;

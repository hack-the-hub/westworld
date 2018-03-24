import React, { Component } from "react";

class Title extends Component {

    render() {
        const {name, type, creator, reviews} = this.props;

        return (
            <div className="list-single-header list-single-header-inside fl-wrap">
                <div className="container">
                    <div className="list-single-header-item">
                        <div className="row">
                            <div className="col-md-8">
                                <div className="list-single-header-item-opt fl-wrap">
                                    <div className="list-single-header-cat fl-wrap">
                                        <a href="#">{type}</a>
                                    </div>
                                </div>
                                <h2>
                                    {name}
                                    <span>- Hosted By</span>
                                    <a href="author-single.html">{creator}</a>
                                </h2>
                                <span className="section-separator" />
                                <div
                                    className="listing-rating card-popup-rainingvis"
                                    data-starrating2="5"
                                >
                                    <span>({reviews} reviews)</span>
                                </div>
                                <div className="list-post-counter single-list-post-counter">
                                    <span>4</span>
                                    <i className="fa fa-heart" />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="fl-wrap list-single-header-column">
                                    <span className="viewed-counter">
                                        <i className="fa fa-eye" />
                                        Viewed - 156
                                    </span>
                                    <a
                                        className="custom-scroll-link"
                                        href="#sec5"
                                    >
                                        <i className="fa fa-hand-o-right" />Add
                                        Review
                                    </a>
                                    <div className="share-holder hid-share">
                                        <div className="showshare">
                                            <span>Share</span>
                                            <i className="fa fa-share" />
                                        </div>
                                        <div className="share-container  isShare" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Title;

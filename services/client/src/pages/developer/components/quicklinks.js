import React, { Component } from "react";

class QuickLinks extends Component {
    render() {
        return (
            <div className="scroll-nav-wrapper fl-wrap">
                <div className="container">
                    <nav className="scroll-nav scroll-init">
                        <ul>
                            <li>
                                <a className="act-scrlink" href="#sec1">
                                    Gallery
                                </a>
                            </li>
                            <li>
                                <a href="#sec2">Details</a>
                            </li>
                            <li>
                                <a href="#sec3">Video</a>
                            </li>
                            <li>
                                <a href="#sec4">Reviews</a>
                            </li>
                        </ul>
                    </nav>
                    <a href="#" className="save-btn">
                        <i className="fa fa-heart" />
                        Save
                    </a>
                </div>
            </div>
        );
    }
}

export default QuickLinks;

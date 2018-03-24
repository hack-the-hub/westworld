import React, { Component } from "react";

import Header from "components/layout/header";
import Footer from "components/layout/footer";

import Description from "./components/description";
import LocationInformation from "./components/location-information";

import Communtity from "components/shared/community";

import {listings} from './data';

class VenuePage extends Component {
    render() {
        const { dispatch, isAuthenticated } = this.props;
        const { id } = this.props.match.params;
        const listing = listings.find(listing => listing.id==id);

        console.log(listing);

        return (
            <div>
                <div id="main">
                    <Header {...this.props} />

                    <div id="wrapper">
                        <div className="content">

                            <section className="gray-section no-top-padding">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="box-widget-wrap">
                                                <LocationInformation listing={listing} />
                                            </div>
                                        </div>

                                        <div className="col-md-8">
                                            <div
                                                className="list-single-main-wrapper fl-wrap"
                                                id="sec2"
                                            >
                                                <Description listing={listing}/>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </section>

                            <div className="limit-box fl-wrap" />

                            <Communtity />
                        </div>
                    </div>

                    <Footer />

                    <a className="to-top">
                        <i className="fa fa-angle-up" />
                    </a>
                </div>
            </div>
        );
    }
}

export default VenuePage;

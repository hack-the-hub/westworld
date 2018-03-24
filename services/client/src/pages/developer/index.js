import React, { Component } from "react";

import Header from "components/layout/header";
import Footer from "components/layout/footer";

import PromoVideo from "./components/promovideo";
import Breadcrumb from "./components/breadcrumb";
import Title from "./components/title";
import Dashboard from "./components/dashboard";
import Description from "./components/description";
import Details from "./components/details";
import WorkingHours from "./components/workinghours";
import Reservation from "./components/reservation";
import LocationInformation from "./components/locationinformation";

import Communtity from "components/shared/community";
import QuickLinks from "./components/quicklinks";

import {listings} from './data';

class VenuePage extends Component {
    render() {
        const { dispatch, isAuthenticated } = this.props;
        const { id } = this.props.match.params;

        console.log(id);

        const listing = listings.find(listing => listing.id==id);

        console.log(listing);

        return (
            <div>
                <div id="main">
                    <Header {...this.props} />

                    <div id="wrapper">
                        <div className="content">
                            <QuickLinks />

                            <section className="gray-section no-top-padding">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-8">
                                            <div
                                                className="list-single-main-wrapper fl-wrap"
                                                id="sec2"
                                            >
                                                <Breadcrumb />

                                                <Title {...listing} />

                                                <Dashboard />

                                                <Description />

                                                <PromoVideo />

                                                <Details />
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="box-widget-wrap">
                                                <WorkingHours />

                                                <Reservation />

                                                <LocationInformation />
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

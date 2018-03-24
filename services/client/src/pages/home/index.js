import React, { Component } from "react";

import Header from "components/layout/header";
import Footer from "components/layout/footer";
import FeaturedDevelopers from "./components/featured-developers";
import FeaturedMeetups from "./components/featured-meetups";
import Question from "./components/question";

class HomePage extends Component {
    render() {
        const { dispatch, isAuthenticated } = this.props;

        return (
            <div>
                <div id="main">
                    <Header {...this.props} />

                    <div id="wrapper">
                        <div className="content">

                            <FeaturedDevelopers />

                            <FeaturedMeetups />

                            <Question />
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

export default HomePage;

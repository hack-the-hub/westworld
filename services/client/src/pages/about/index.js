import React, { Component } from "react";

import Header from "components/layout/header";
import Footer from "components/layout/footer";
import Question from "./components/question";
import AboutUs from "./components/aboutus";

class AboutPage extends Component {
    render() {
        const { dispatch, isAuthenticated } = this.props;

        return (
            <div>
                <div id="main">
                    <Header {...this.props} />

                    <div id="wrapper">
                        <div className="content">
                            <AboutUs />

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

export default AboutPage;

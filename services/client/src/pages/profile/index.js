import React, { Component } from "react";

import Header from "components/layout/header";
import Footer from "components/layout/footer";
import Question from "components/shared/question";
import Profile from "./components/profile";

import UserStatus from 'components/user/UserStatus';

class ProfilePage extends Component {
    render() {
        const { dispatch, isAuthenticated } = this.props;

        return (
            <div>
                <div id="main">
                    <Header {...this.props} />

                    <div id="wrapper">
                        <div className="content">

                            <Profile />

                            <div className="limit-box fl-wrap" />

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

export default ProfilePage;

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import HomePage from "pages/home";
import ListingPage from "pages/listing";
import MeetupListingPage from "pages/meetup-listing";
import DeveloperPage from "pages/developer";
import ErrorPage from "pages/404";
import ProfilePage from "pages/profile";
import AboutPage from "pages/about";

class App extends Component {
    render() {
        const { isAuthenticated, errorMessage } = this.props;

        return (
            <div>
                <Router>
                    <Switch>
                        <Route
                            exact={true}
                            path="/"
                            render={props => <HomePage {...this.props} />}
                        />
                        <Route
                            exact={true}
                            path="/listing"
                            render={props => <ListingPage {...this.props} />}
                        />
                        <Route
                            exact={true}
                            path="/meetup-listing"
                            render={props => <MeetupListingPage {...this.props} />}
                        />
                        <Route
                            path="/developer/:id"
                            render={props => <DeveloperPage {...this.props} {...props} />}
                        />
                        <Route
                            path="/profile"
                            render={props => <ProfilePage {...this.props} />}
                        />
                        <Route
                            exact={true}
                            path="/about"
                            render={props => <AboutPage {...this.props} />}
                        />
                        <Route
                            render={props => <ErrorPage {...this.props} />}
                        />
                    </Switch>
                </Router>
            </div>
        );
    }
}

App.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string
};

// These props come from the application's
// state when it is started
function mapStateToProps(state) {
    const { auth } = state;
    const { isAuthenticated, errorMessage } = auth;

    return { isAuthenticated, errorMessage };
}

export default connect(mapStateToProps)(App);

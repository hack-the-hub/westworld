import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default class Login extends Component {
    render() {
        const { errorMessage } = this.props;

        return (
            <div>
                <div className="custom-form">
                    <form name="registerform">
                        <label>Username or Email Address *</label>
                        <input
                            type="text"
                            ref="email"
                            placeholder="Username"
                            className="input"
                        />
                        <label>Password *</label>
                        <input
                            type="password"
                            ref="password"
                            className="input"
                            placeholder="●●●●●●●"
                        />
                        <button
                            className="log-submit-btn"
                            onClick={event => this.handleClick(event)}
                        >
                            <span>Log In</span>
                        </button>
                        <div className="clearfix" />
                        <div className="filter-tags">
                            <input id="check-a" type="checkbox" name="check" />
                            <label htmlFor="check-a">Remember me</label>
                        </div>
                    </form>
                    <div className="lost_password">
                        <Link to="/lost_password">Lost Your Password?</Link>
                    </div>
                </div>

                {errorMessage && <p>{errorMessage}</p>}
            </div>
        );
    }

    handleClick(event) {
        event.preventDefault();
        const email = this.refs.email;
        const password = this.refs.password;
        const creds = {
            email: email.value.trim(),
            password: password.value.trim()
        };
        this.props.onLoginClick(creds);
    }
}

Login.propTypes = {
    errorMessage: PropTypes.string
};

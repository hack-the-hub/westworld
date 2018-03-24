import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Login extends Component {
    render() {
        const { errorMessage } = this.props;

        return (
            <div>
                <div className="custom-form">
                    <form
                        method="post"
                        name="registerform"
                        className="main-register-form"
                        id="main-register-form2"
                    >
                        <label>Name *</label>
                        <input name="name" type="text" value="" />
                        <label>Username *</label>
                        <input name="username" type="text" value="" />
                        <label>Email Address *</label>
                        <input name="email" type="text" value="" />
                        <label>Password *</label>
                        <input name="password" type="password" value="" />
                        <button
                            type="submit"
                            className="log-submit-btn"
                            onClick={event => this.handleClick(event)}
                        >
                            <span>Register</span>
                        </button>
                    </form>
                </div>

                {errorMessage && <p>{errorMessage}</p>}
            </div>
        );
    }

    handleClick(event) {
        const name = this.refs.name;
        const username = this.refs.username;
        const email = this.refs.email;
        const password = this.refs.password;
        const creds = {
            name: name.value.trim(),
            username: name.value.trim(),
            email: email.value.trim(),
            password: password.value.trim()
        };
        this.props.onRegisterClick(creds);
    }
}

Login.propTypes = {
    errorMessage: PropTypes.string
};

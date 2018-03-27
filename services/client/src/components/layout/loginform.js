import React, { Component } from "react";

import Login from "./login";

import { loginUser } from "actions/login";

import { Redirect } from "react-router-dom";

class LoginForm extends Component {
  render() {
    const { dispatch, isAuthenticated, errorMessage, redirectTo } = this.props;

    return (
      <div>
        {isAuthenticated &&
          redirectTo !== null && <Redirect push="push" to="/profile" />}

        {!isAuthenticated && (
          <Login
            errorMessage={errorMessage}
            onLoginClick={creds => dispatch(loginUser(creds))}
          />
        )}
      </div>
    );
  }
}

export default LoginForm;

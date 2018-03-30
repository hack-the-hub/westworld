import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

import Login from './login';
import {loginUser} from 'actions/login';

class LoginForm extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string.isRequired,
    redirectTo: PropTypes.string.isRequired
  };

  render() {
    const {dispatch, isAuthenticated, errorMessage, redirectTo} = this.props;

    return (
      <div>
        {isAuthenticated &&
          redirectTo !== null && <Redirect push='push' to='/profile' />}

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

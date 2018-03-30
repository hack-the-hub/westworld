import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Login extends Component {

  static propTypes = {
    errorMessage: PropTypes.string.isRequired,
    onRegisterClick: PropTypes.func.isRequired,
  };

  handleClick = (e) => {
    e.preventDefault();

    const {name, username, email, password} = this.refs;

    const creds = {
      name: name.value.trim(),
      username: username.value.trim(),
      email: email.value.trim(),
      password: password.value.trim()
    };
    this.props.onRegisterClick(creds);
  };

  render() {
    const {errorMessage} = this.props;

    return (
      <div>
        <div className='custom-form'>
          <form
            method='post'
            name='registerform'
            className='main-register-form'
            id='main-register-form2'
          >
            <label>Name *</label>
            <input name='name' type='text' value='' />
            <label>Username *</label>
            <input name='username' type='text' value='' />
            <label>Email Address *</label>
            <input name='email' type='text' value='' />
            <label>Password *</label>
            <input name='password' type='password' value='' />
            <button
              type='submit'
              className='log-submit-btn'
              onClick={this.handleClick()}
            >
              <span>Register</span>
            </button>
          </form>
        </div>

        {errorMessage && <p>{errorMessage}</p>}
      </div>
    );
  }
}

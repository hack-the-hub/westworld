import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Register extends Component {

  static propTypes = {
    errorMessage: PropTypes.string.isRequired,
    onRegisterClick: PropTypes.func.isRequired
  };

  handleClick = (e) => {
    e.preventDefault();
    const {username, email, password} = this.refs;
    const creds = {
      username: username.value.trim(),
      email: email.value.trim(),
      password: password.value.trim()
    };
    this.props.onRegisterClick(creds);
  };

  render() {
    const {errorMessage} = this.props;

    return (
      <div className='column is-6 '>
        <h1 className='title'>Register an Account</h1>

        <div className='box'>
          <label className='label'>Username</label>
          <p className='control'>
            <input
              className='input'
              ref='username'
              type='text'
              placeholder='Joe Bloggs'
            />
          </p>

          <label className='label'>Email</label>
          <p className='control'>
            <input
              type='text'
              ref='email'
              type='email'
              placeholder='Email'
              className='input'
              placeholder='jsmith@example.org'
            />
          </p>

          <label className='label'>Password</label>
          <p className='control'>
            <input
              type='password'
              ref='password'
              className='input'
              placeholder='●●●●●●●'
            />
          </p>
          <hr />

          <p className='control'>
            <button
              className='button is-primary'
              onClick={event => this.handleClick(event)}
            >
              Register
            </button>
          </p>

          {errorMessage && <p>{errorMessage}</p>}
        </div>
      </div>
    );
  }
}

import React, { Component } from "react";

class RegisterForm extends Component {
  render() {
    return (
      <div className="custom-form">
        <form
          method="post"
          name="registerform"
          className="main-register-form"
          id="main-register-form2"
        >
          <label>First Name *</label>
          <input name="name" type="text" value="" />
          <label>Second Name *</label>
          <input name="name2" type="text" value="" />
          <label>Email Address *</label>
          <input name="email" type="text" value="" />
          <label>Password *</label>
          <input name="password" type="password" value="" />
          <button type="submit" className="log-submit-btn">
            <span>Register</span>
          </button>
        </form>
      </div>
    );
  }
}

export default RegisterForm;

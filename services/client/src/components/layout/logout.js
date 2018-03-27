import React, { Component } from "react";

class Logout extends Component {
  render() {
    const { onLogoutClick } = this.props;

    return (
      <a href="" onClick={() => onLogoutClick()}>
        Logout
      </a>
    );
  }
}

export default Logout;

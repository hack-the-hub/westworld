import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Logout extends Component {

  static propTypes = {
    onLogoutClick: PropTypes.func.isRequired
  };

  render() {
    const {onLogoutClick} = this.props;

    return (
      <a href='' onClick={() => onLogoutClick()}>
        Logout
      </a>
    );
  }
}

export default Logout;

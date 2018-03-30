import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Pane extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.element
    ]).isRequired
  };

  render() {
    return <div>{this.props.children}</div>;
  }
}

export default Pane;

import {Component} from 'react';
import {withRouter} from 'react-router';
import PropTypes from 'prop-types';

class ScrollToTop extends Component {
  static propTypes = {
    location: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.element
    ]).isRequired
  };

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(ScrollToTop);

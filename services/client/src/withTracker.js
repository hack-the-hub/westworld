import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactGA from "react-ga";

export default function withTracker(WrappedComponent, options = {}) {
  const trackPage = page => {
    ReactGA.set({
      page,
      ...options
    });
    ReactGA.pageview(page);
  };

  const HOC = class extends Component {
    componentDidMount() {
      const { location } = this.props;
      const page = location.pathname;
      trackPage(page);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

  HOC.propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired
    }).isRequired
  };

  return HOC;
}

import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import CallToActionBanner from "components/call-to-action-banner";
import Spinner from "components/spinner/loading";
import Event from "components/event";
import Error from "components/event/error";
import NoEvents from "components/no-events";
import EventSeparator from "components/event-separator";
import getBucketsFor from "utils/get-buckets-for";

class Events extends Component {
  state = {};

  componentDidMount() {
    const { fetchData } = this.props;
    fetchData(`http://localhost/events`);
  }

  renderRecentEvents() {
    const { recentEvents } = this.props;

    if (!_.isArray(recentEvents)) return null;

    return (
      <div className="recent-events">
        <EventSeparator content="Recent Events" id="recent-events" />
        {recentEvents.map(item => (
          <Event key={item.id} className="recent-event" content={item} />
        ))}
        {recentEvents.length === 0 ? <NoEvents /> : null}
      </div>
    );
  }

  renderUpcomingEvents() {
    const { upcomingEvents } = this.props;

    if (!_.isArray(upcomingEvents)) return null;

    const bucketedEvents = getBucketsFor(upcomingEvents);

    return _.map(bucketedEvents, ({ id, message, className, events }) => (
      <div key={id} className={className}>
        <EventSeparator content={message} id={id} />
        {events.length === 0 ? <NoEvents /> : null}
        {_.map(events, item => (
          <Event key={item.id} content={item} />
        ))}
      </div>
    ));
  }

  renderLoading() {
    const { isLoading } = this.props;

    if (isLoading) {
      return <Spinner />;
    }
    return (
      <div>
        {this.renderRecentEvents()}
        {this.renderUpcomingEvents()}
      </div>
    );
  }

  renderError() {
    const { hasErrors } = this.props;
    if (hasErrors) {
      return <Error />;
    }
    return null;
  }

  render() {
    return (
      <div className="page">
        <CallToActionBanner />
        {this.renderLoading()}
        {this.renderError()}
      </div>
    );
  }
}

Events.propTypes = {
  fetchData: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  hasErrors: PropTypes.bool.isRequired,
  upcomingEvents: PropTypes.arrayOf(PropTypes.object).isRequired,
  recentEvents: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Events;

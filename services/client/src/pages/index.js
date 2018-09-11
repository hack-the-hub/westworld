import React, { Component } from "react";
import axios from "axios";
import _ from "lodash";
import moment from "moment";
import CallToActionBanner from "components/call-to-action-banner";
import Spinner from "components/spinner/loading";
import Event from "components/event";
import NoEvents from "components/no-events";
import EventSeparator from "components/event-separator";
import getBucketsFor from "utils/get-buckets-for";

const updateEventsList = function(eventsList) {
  const events = _.map(eventsList, item =>
    _.extend({}, item, { timestamp: moment(item.time).valueOf() })
  );
  return _.orderBy(events, ["timestamp"], ["asc"]);
};

class Events extends Component {
  state = {};

  componentDidMount() {
    this.getEvents();
  }

  getEvents() {
    const options = {
      url: `${process.env.REACT_APP_EVENTS_SERVICE_URL}/events`,
      method: "get"
    };

    return axios(options)
      .then(({ data }) => {
        this.setState({
          upcomingEvents: updateEventsList(data.data.upcoming_events),
          recentEvents: updateEventsList(data.data.recent_events)
        });
      })
      .catch(error => {
        console.log(`events error: ${error}`); // eslint-disable-line no-console
      });
  }

  renderRecentEvents() {
    const { recentEvents } = this.state;

    if (!_.isArray(recentEvents)) return <Spinner />;
    if (recentEvents.length === 0) return null;

    return (
      <div className="recent-events">
        <EventSeparator content="Recent Events" id="recent-events" />
        {recentEvents.map(item => (
          <Event key={item.id} className="recent-event" content={item} />
        ))}
      </div>
    );
  }

  renderNowsEvents() {
    const { recentEvents } = this.state;

    if (!_.isArray(recentEvents)) return <Spinner />;
    if (recentEvents.length === 0) return null;

    return (
      <div className="nows-events">
        <EventSeparator content="Events on Right Now" id="now-events" />
        {recentEvents.map(item => (
          <Event key={item.id} className="nows-events" content={item} />
        ))}
      </div>
    );
  }

  renderUpcomingEvents() {
    const { upcomingEvents } = this.state;

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

  render() {
    return (
      <div>
        <CallToActionBanner />
        {this.renderRecentEvents()}
        {this.renderNowsEvents()}
        {this.renderUpcomingEvents()}
      </div>
    );
  }
}

export default Events;

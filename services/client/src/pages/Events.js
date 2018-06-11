import React, { Component } from "react";
import axios from "axios";
import CallToActionBanner from "../components/CallToActionBanner";
import Content from "../components/Content";
import Pagination from "../components/Pagination";

import _ from "lodash";
import moment from "moment";

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    };
  }

  componentDidMount() {
    this.getEvents();
  }

  getEvents = e => {
    const options = {
      url: `${process.env.REACT_APP_EVENTS_SERVICE_URL}/events`,
      method: "get"
    };
    return axios(options)
      .then(res => {
        var events = _.map(res.data.data.events, function(item) {
          return _.extend({}, item, { timestamp: moment(item.time).valueOf() });
        });
        var sortedEvents = _.orderBy(events, ["timestamp"], ["asc"]);
        this.setState({ events: sortedEvents });
      })
      .catch(error => {
        console.log("events error: " + error);
      });
  };

  renderEvents() {
    const events = this.state.events;
    return events.map(el => {
      const {
        id,
        name,
        description,
        created,
        time,
        event_url,
        photo_url,
        group_name,
        status,
        source
      } = el;
      return (
        <Content
          key={id}
          id={id}
          name={name}
          description={description}
          created={created}
          time={time}
          event_url={event_url}
          photo_url={photo_url}
          status={status}
          groupName={group_name}
          source={source}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <CallToActionBanner />
        {this.renderEvents()}
        <Pagination />
      </div>
    );
  }
}

export default Events;

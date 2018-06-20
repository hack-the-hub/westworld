import React, { Component } from "react";
import axios from "axios";
import CallToActionBanner from "../components/CallToActionBanner";
import Content from "../components/Content";

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
    return events.map(content => {
      return <Content key={content.id} content={content} />;
    });
  }

  render() {
    return (
      <div>
        <CallToActionBanner />
        {this.renderEvents()}
      </div>
    );
  }
}

export default Events;

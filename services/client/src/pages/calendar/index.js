import React, { Component } from "react";
import axios from "axios";
import _ from "lodash";
import moment from "moment";
import CallToActionBanner from "components/call-to-action-banner";
import Spinner from "components/spinner/loading";
import Calendar from "components/calendar";

const updateCalendarList = function(calendarList) {
  const updatedCalendarList = _.map(calendarList, item => {
    let updatedItem;

    if (!_.isUndefined(item.start) && !_.isUndefined(item.end)) {
      updatedItem = item;
      updatedItem.start = moment(item.start).toDate();
      updatedItem.end = moment(item.end).toDate();
      return updatedItem;
    }
    return updatedItem;
  });
  return updatedCalendarList;
};

class EventCalendar extends Component {
  state = {
    events: []
  };

  componentDidMount() {
    this.getCalendar();
  }

  getCalendar() {
    const options = {
      url: `${process.env.REACT_APP_EVENTS_SERVICE_URL}/events/calendar`,
      method: "get"
    };

    return axios(options)
      .then(({ data }) => {
        this.setState({
          events: updateCalendarList(data.data)
        });
      })
      .catch(error => {
        console.log(`calendar error: ${error}`); // eslint-disable-line no-console
      });
  }

  renderCalendar() {
    const { events } = this.state;

    if (!_.isArray(events)) return <Spinner />;
    if (events.length === 0) return null;

    return <Calendar events={events} />;
  }

  render() {
    return (
      <div className="page">
        <CallToActionBanner />
        {this.renderCalendar()}
      </div>
    );
  }
}

export default EventCalendar;

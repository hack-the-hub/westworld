import React from "react";
import moment from "moment";

class Content extends React.Component {
  formatTitle(str) {
    return str.toLowerCase().replace(/\b(\w)/g, s => s.toUpperCase());
  }

  renderTime(time) {
    if (!time) return;

    const now = moment();
    var eventTime = moment.utc(time);
    var formattedEventTime;

    if (eventTime.isBefore(now)) {
      formattedEventTime = eventTime.toNow();
    } else if (eventTime.isAfter(now)) {
      formattedEventTime = eventTime.fromNow();
    }
    return (
      <span className="text-grey-light italic">
        {" "}
        next event {formattedEventTime}
      </span>
    );
  }

  renderSource(source) {
    let eventSourceImage = ""
    if (source === "eventbrite") {
      eventSourceImage = "http://adultandchild.org/wp-content/uploads/2014/08/Eventbrite-Icon.png"
    } else if (source === "meetup") {
      eventSourceImage = "https://assets.materialup.com/uploads/30b4082d-3390-44d6-973e-60ca8972f854/preview"
    } else if (source === "nisciencefestival") {
      eventSourceImage = "https://i2.wp.com/www.belfasttimes.co.uk/wp-content/uploads/2016/02/NISF2016_FINAL.jpg?fit=1181%2C1181"
    }

    if (eventSourceImage !== "") {
      return (
        <img
          className="event-content-icon"
          src={eventSourceImage}
          alt=""
        />
      );
    }

    return (
      <i
        className="rounded-full mt-2 fa fa-calendar-o event-content-icon"
        alt=""
      />
    );
  }

  render() {
    const {
      id,
      name,
      time,
      event_url,
      group_name,
      source
    } = this.props.content;

    const groupNameStyle = {
      paddingRight: "0.3rem"
    };

    return (
      <div
        id={id}
        className="bg-white border border-grey-lightest flex p-2 shadow-light hover:shadow"
      >
        <div className="ml-2">{this.renderSource(source)}</div>
        <div className="w-3/4">
          <div className="ml-4 mt-1">
            <div className="mb-2">
              <a
                className="text-lg text-black font-thin no-underline"
                href={event_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {this.formatTitle(name)}
              </a>
            </div>
            <div className="text-xs text-grey">
              <span style={groupNameStyle}>{group_name}</span>
              {this.renderTime(time)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Content;

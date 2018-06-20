import React from "react";
import moment from "moment";

const iconStyle = {
  height: "32px",
  fontSize: "1.5em"
};

const imageStyle = {
  maxWidth: "35px",
  paddingTop: "10px"
};

class Content extends React.Component {
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
    return <span className="text-grey-light italic">{formattedEventTime}</span>;
  }

  renderSource(source) {
    if (source === "eventbrite") {
      return (
        <img
          style={imageStyle}
          src="http://adultandchild.org/wp-content/uploads/2014/08/Eventbrite-Icon.png"
          alt=""
        />
      );
    } else if (source === "meetup") {
      return (
        <img
          style={imageStyle}
          src="https://assets.materialup.com/uploads/30b4082d-3390-44d6-973e-60ca8972f854/preview"
          alt=""
        />
      );
    } else if (source === "nisciencefestival") {
      return (
        <img
          style={imageStyle}
          src="https://i2.wp.com/www.belfasttimes.co.uk/wp-content/uploads/2016/02/NISF2016_FINAL.jpg?fit=1181%2C1181"
          alt=""
        />
      );
    }

    return (
      <i
        className="rounded-full mt-2 fa fa-calendar-o"
        style={iconStyle}
        alt=""
      />
    );
  }

  render() {
    debugger;
    const {
      id,
      name,
      time,
      event_url,
      group_name,
      source
    } = this.props.content;

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
                {name}
              </a>
            </div>
            <div className="text-xs text-grey">
              <span
                style={{
                  paddingRight: "1rem"
                }}
              >
                {group_name}
              </span>
              {this.renderTime(time)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Content;

import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

const TimeToEvent = ({ startTime }) => {
  const now = moment();
  const eventTime = moment.utc(startTime);
  const duration = moment.duration(eventTime.diff(now));
  const eventTimeStamp = moment(startTime).format("dddd, Do of MMMM h:mmA");

  return (
    <React.Fragment>
      <style jsx>{`
        span {
          color: #989fa5;
          font-style: italic;
        }
      `}</style>
      <span>
        {duration > 0 ? "next" : "last"} event {duration.humanize(true)} ({eventTimeStamp})
      </span>
    </React.Fragment>
  );
};

TimeToEvent.propTypes = {
  startTime: PropTypes.string.isRequired
};

export default TimeToEvent;

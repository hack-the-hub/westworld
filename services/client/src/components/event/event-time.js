import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

const TimeToEvent = ({ startTime }) => {
  const eventTimeStamp = moment(startTime).format("dddd, Do of MMMM h:mmA");

  return (
    <React.Fragment>
      <style jsx>{`
        span {
          color: #989fa5;
          font-style: italic;
          font-weight: 200;
        }
      `}</style>
      <span>{eventTimeStamp}</span>
    </React.Fragment>
  );
};

TimeToEvent.propTypes = {
  startTime: PropTypes.string.isRequired
};

export default TimeToEvent;

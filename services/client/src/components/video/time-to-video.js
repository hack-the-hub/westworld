import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

const TimeToVideo = ({ start }) => {
  const now = moment();
  const eventTime = moment.utc(start);
  const duration = moment.duration(eventTime.diff(now));

  return (
    <React.Fragment>
      <style jsx>{`
        span {
          color: #dae1e7;
          font-style: italic;
        }
      `}</style>
      <span>created {duration.humanize(true)}</span>
    </React.Fragment>
  );
};

TimeToVideo.propTypes = {
  start: PropTypes.number.isRequired
};

export default TimeToVideo;

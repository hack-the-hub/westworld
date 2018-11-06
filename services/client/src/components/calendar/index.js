import React from "react";
import PropTypes from "prop-types";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import styles from "./styles";

const localizer = BigCalendar.momentLocalizer(moment);

const Calendar = ({ events }) => (
  <div className="calendar">
    <style jsx>{styles}</style>
    <BigCalendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      views={["month", "day"]}
      min={moment("08:00am", "h:mma").toDate()}
      max={moment("7:59pm", "h:mma").toDate()}
    />
  </div>
);

Calendar.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      start: PropTypes.Date,
      end: PropTypes.Date,
      title: PropTypes.string
    })
  ).isRequired
};

export default Calendar;

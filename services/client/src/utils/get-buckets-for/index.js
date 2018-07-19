import _ from "lodash";
import moment from "moment";

const withinDays = days => ({ start }) =>
  moment(start).diff(moment(), "days") <= days - 1;

const buckets = [
  {
    id: "today",
    check: ({ start }) =>
      moment()
        .endOf("day")
        .diff(moment(start)) > 0,
    message: "Today"
  },
  {
    id: "in-next-seven-days",
    check: withinDays(7),
    message: "Next 7 days"
  },
  {
    id: "in-next-thirty-days",
    check: withinDays(30),
    message: "Next 30 days"
  },
  {
    id: "in-next-three-months",
    check: withinDays(110),
    message: "Next 3 months"
  },
  { id: "in-the-future", check: () => true, message: "And beyond..." }
];

export default function(upcomingEvents) {
  const bucketedEvents = _.reduce(
    upcomingEvents,
    (bucketed, upcomingEvent) => {
      const { id } = _.find(buckets, ({ check }) => check(upcomingEvent));
      return {
        ...bucketed,
        [id]: (bucketed[id] || []).concat(upcomingEvent)
      };
    },
    {}
  );

  return _.map(buckets, ({ id, message }) => ({
    id,
    message,
    className: `events-${id}`,
    events: bucketedEvents[id] || []
  }));
}

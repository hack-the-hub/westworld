import _ from "lodash";
import moment from "moment";

export function updateEventsList(eventsList) {
  const updatedEvents = _.map(eventsList, item =>
    _.extend({}, item, { timestamp: moment(item.start).valueOf() })
  );

  return _.orderBy(updatedEvents, ["timestamp"], ["asc"]);
}

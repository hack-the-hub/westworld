import _ from "lodash";
import moment from "moment";
import parseDomain from "parse-domain";

export function updateEventsList(eventsList) {
  const updatedEvents = _.map(eventsList, item =>
    _.extend({}, item, { timestamp: moment(item.start).valueOf() })
  );

  return _.orderBy(updatedEvents, ["timestamp"], ["asc"]);
}

export const parsedDomain = parseDomain(window.location.origin, {
  customTlds: /localhost/
});

import parseDomain from "parse-domain";

export const parsedDomain = parseDomain(window.location.origin, {
  customTlds: /localhost/
});

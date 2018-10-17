import _ from "lodash";

export const formatTitle = str => _.startCase(str);

export const formatAvatar = str => _.toLower(str);

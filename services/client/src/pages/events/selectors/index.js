export const getRecentEvents = state => state.events.recentEvents;

export const getUpcomingEvents = state => state.events.upcomingEvents;

export const isLoading = state => state.events.isLoading;

export const hasErrors = state => state.events.hasErrors;

export const hasMoreItems = state => state.events.hasMoreItems;

export const getEventsUrl = state => state.events.url;

export const getEventsLocation = state => state.events.location;

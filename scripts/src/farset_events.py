# std lib import
import datetime
import os
import pprint
import requests
import json

EVENTS_ENDPOINT = os.getenv("EVENTS_ENDPOINT")

FARSET_LABS_CALENDAR = "https://www.googleapis.com/calendar/v3/calendars/farsetlabs.org.uk_srmqnkn373auq51u00s2nijrq8%40group.calendar.google.com/events?timeMin=2018-08-06T20%3A52%3A10.536127Z&maxResults=50&singleEvents=true&orderBy=startTime&key=AIzaSyAqmyUSbK13EX58WDExY9LN4VXZecI9wB8&alt=json"


def get_events():
    """Gets events from the Farset labs google calendar."""
    response = requests.get(FARSET_LABS_CALENDAR)
    return [event for event in response.json()["items"]]


def _transform_event(event):
    unsupported_events = [
        "Private Member Booking",
        "Directors Meeting",
        "Management Meeting",
        "Code Coop NI",
        "Code Co op NI",
        "Code Co-op NI",
        "2017",
    ]

    event_name = event["summary"]
    unsupported = [ue for ue in unsupported_events if ue.lower() in event_name.lower()]

    if unsupported:
        return

    created = event["created"]
    start = event["start"]["dateTime"]
    end = event["end"]["dateTime"]

    # TODO calculate duration fo event
    duration = 10000

    return {
        "name": event["summary"],
        "description": event["summary"],
        "url": event["htmlLink"],
        "start": start,
        "end": end,
        "duration": duration,
        "topics": [],
        "entry": ["free"],
        "category": event["organizer"]["displayName"],
        "source": "farsetlabs",
        "location": "belfast",
    }


def _post_payloads(payloads):
    responses = []
    for payload in payloads:
        r = requests.post(
            EVENTS_ENDPOINT,
            headers={"Content-type": "application/json"},
            data=json.dumps(payload),
        )
        print(r.status_code)


if __name__ == "__main__":
    events = get_events()
    transformed_events = [_transform_event(e) for e in events]
    _post_payloads(transformed_events)

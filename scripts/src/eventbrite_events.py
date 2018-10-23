# std lib import
import os
import pprint
import requests
import json

# 3rd party imports
from eventbrite import Eventbrite


EVENTBRITE_API_TOKEN = os.getenv("EVENTBRITE_API_TOKEN")
EVENTS_ENDPOINT = os.getenv("EVENTS_ENDPOINT")
LOCATION = os.getenv("LOCATION")

client = Eventbrite(EVENTBRITE_API_TOKEN)


def init():
    if not EVENTBRITE_API_TOKEN:
        raise Exception("EVENTBRITE_API_TOKEN is not defined")
    if not EVENTS_ENDPOINT:
        raise Exception("EVENTS_ENDPOINT is not defined")
    if not LOCATION:
        raise Exception("LOCATION is not defined")

    print(f"Loading events for {LOCATION}")
    print(f"Configured Eventbrite Events to POST to {EVENTS_ENDPOINT}")


def _transform_event(event):
    return {
        "name": event["name"]["text"],
        "description": event["description"]["text"],
        "url": event.get("url", ""),
        "start": event["start"]["utc"],
        "end": event["end"]["utc"],
        "duration": 100000,
        "topics": [],
        "entry": ["ticket"],
        "category": event["name"]["text"],
        "source": "eventbrite",
        "location": LOCATION.lower(),
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
        responses.append(r)


if __name__ == "__main__":
    init()

    response = client.get(
        f"/events/search/?q=technology&location.address={LOCATION}&sort_by=-date"
    )
    events = response["events"]

    transformed_events = [_transform_event(e) for e in events]

    _post_payloads(transformed_events)

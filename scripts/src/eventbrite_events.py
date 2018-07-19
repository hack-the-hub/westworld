# std lib import
import os
import pprint
import requests
import json

# 3rd party imports
from eventbrite import Eventbrite


EVENTBRITE_API_TOKEN = os.getenv("EVENTBRITE_API_TOKEN")
EVENTS_ENDPOINT = os.getenv("EVENTS_ENDPOINT")

client = Eventbrite(EVENTBRITE_API_TOKEN)


def _transform_event(event):
    return {
        "name": event["name"]["text"],
        "description": event["description"]["text"],
        "url": event.get("url", ""),
        "start": event["start"]["utc"],
        "end": event["end"]["utc"],
        "duration": 100000,
        "topics": [],
        "entry": ['ticket'],
        "category": event["name"]["text"],
        "source": "eventbrite",
    }


def _post_payloads(payloads):
    responses = []
    for payload in payloads:
        r = requests.post(
            EVENTS_ENDPOINT,
            headers={"Content-type": "application/json"},
            data=json.dumps(payload),
        )
        responses.append(r)


if __name__ == "__main__":
    response = client.get(
        "/events/search/?q=technology&location.address=belfast&sort_by=-date"
    )
    events = response["events"]

    transformed_events = [_transform_event(e) for e in events]

    _post_payloads(transformed_events)

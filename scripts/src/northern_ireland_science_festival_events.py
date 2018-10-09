from datetime import datetime
import hashlib
import os
import json

from bs4 import BeautifulSoup
import requests

EVENTS_ENDPOINT = os.getenv("EVENTS_ENDPOINT")

URL = "http://www.nisciencefestival.com/programme.php?c=all"


def init():
    if not EVENTS_ENDPOINT:
        raise Exception("EVENTS_ENDPOINT is not defined")

    print(f"Configured NISF Events to POST to {EVENTS_ENDPOINT}")


def _extract_event_time(raw_event_time):
    month = None
    reaccuring = None

    raw_event_time = raw_event_time.replace("\t", "")

    raw_event_time = raw_event_time.replace("&", ",")

    days = raw_event_time.split(",")[0].split("&")
    times = raw_event_time.split(",")[1].split("-")

    if len(days) > 1:
        reaccuring = True

    start_time = times[0].strip()
    if len(times) == 1:
        end_time = times[1].strip()
    else:
        end_time = times[1].strip()

    transformed_days = []

    if len(days) == 1:
        day_info = {}
        raw_day_info = days[0].strip().split(" ")
        day_info["day"] = raw_day_info[1]
        if len(raw_day_info) >= 3:
            day_info["month"] = raw_day_info[2]
        transformed_days.append(day_info)
    else:
        for day in days:
            day_info = {}
            raw_day_info = days[1].strip().split(" ")
            day_info["day"] = raw_day_info[1]
            if len(raw_day_info) >= 3:
                day_info["month"] = raw_day_info[2]

            transformed_days.append(day_info)

    return transformed_days


def _month_to_int(name):
    if name == "jan":
        return 1
    elif name == "feb":
        return 2
    elif name == "mar":
        return 3
    elif name == "apr":
        return 4
    elif name == "may":
        return 5
    elif name == "jun":
        return 6
    elif name == "jul":
        return 7
    elif name == "aug":
        return 8
    elif name == "sep":
        return 9
    elif name == "oct":
        return 10
    elif name == "nov":
        return 11
    elif name == "dev":
        return 12
    else:
        raise ValueError


def _transform_event(event):
    events = []
    base_url = "http://www.nisciencefestival.com/"

    if len(event.get_text().strip()) < 15:
        return

    theme = event.h4.get_text()
    name = event.h3.get_text()
    location = event.p.get_text()
    event_url = base_url + event.a["href"]
    event_times = _extract_event_time(event.find_all("p")[1].get_text())

    for event_time in event_times:
        month = event_time["month"][0:3].lower()
        day = event_time["day"]

        # TODO add hour of events

        created = datetime.now().strftime("%Y-%m-%d %H:%M:%SZ")

        time = datetime(2018, _month_to_int(month), int(day)).strftime(
            "%Y-%m-%d %H:%M:%SZ"
        )
        hashed_id = hashlib.sha256(
            str(theme + name + day + month).encode("utf-8")
        ).hexdigest()

        events.append(
            {
                "name": name,
                "description": theme,
                "url": event_url,
                "start": str(time),
                "end": str(time),
                "duration": 0,
                "topics": [],
                "entry": ["free"],
                "category": "Northern Ireland Science Festival",
                "source": "nisciencefestival",
            }
        )

    return events


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
    data = requests.get(URL).text
    soup = BeautifulSoup(data, "html.parser")

    events = []
    for event in soup.findAll(True, {"class": ["brick", "event"]}):
        try:
            list_of_events = _transform_event(event)
            if list_of_events:
                for list_event in list_of_events:
                    events.append(list_event)
        except Exception:
            print("failed to parse event")

    _post_payloads(events)

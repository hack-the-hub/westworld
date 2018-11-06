# std lib
from datetime import datetime, timedelta

# 3rd party
from sqlalchemy import and_
from flask import Blueprint, jsonify, request

# local
from project.api.models import Event
from project import cache

calendar_blueprint = Blueprint("calendar", __name__)


def _transform(index, event):
    return {"index": index, "title": event.name, "start": event.start, "end": event.end}


@calendar_blueprint.route("/events/calendar", methods=["GET"])
@cache.cached(timeout=1000, query_string=True)
def get_all_calendar():
    """Get all calendar"""
    location = request.args.get("location", "belfast", type=str)
    location = location.lower()

    current_time = datetime.utcnow()
    recent_past = current_time - timedelta(hours=6)

    events = Event.query.filter(
        and_(Event.location == location, Event.start >= recent_past)
    )

    response_object = {
        "status": "success",
        "data": [_transform(index, event) for index, event in enumerate(events)],
    }
    return jsonify(response_object), 200

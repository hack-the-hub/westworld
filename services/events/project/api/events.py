# std lib
from datetime import datetime, timedelta

# 3rd party
from sqlalchemy import exc, and_
from flask import Blueprint, jsonify, request

# local
from project.api.models import Topic
from project.api.models import Entry
from project.api.models import Event
from project import db
from project import cache

events_blueprint = Blueprint("events", __name__)

DEFAULT_PAGE_SIZE = 500


def extract_topics(topics):
    """Creates a list of topics from a given list."""
    topics_list = []
    for topic in topics:
        if topic:
            topics_list.append(Topic(name=str(topic)))
    return topics_list


def extract_enteries(entries):
    entry_list = []
    for entry in entries:
        if entry:
            entry_list.append(Entry(type=str(entry)))
    return entry_list


@events_blueprint.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        name = request.form["name"]
        description = request.form["description"]
        url = request.form["url"]
        start = request.form["start"]
        end = request.form["end"]
        duration = request.form["duration"]
        topics = request.form["topics"]
        entry = request.form["entry"]
        category = request.form["category"]
        source = request.form["source"]

        topic_list = extract_topics(topics)

        event = Event(
            name=name,
            description=description,
            url=url,
            start=start,
            end=end,
            duration=duration,
            topics=topic_list,
            entry=entry,
            category=category,
            source=source,
        )

        db.session.add(event)
        db.session.commit()

    events = Event.query.filter(Event.deleted is None).all()

    response_object = {
        "status": "success",
        "data": {"events": [event.to_dict() for event in events]},
    }
    return jsonify(response_object), 200


@events_blueprint.route("/status", methods=["GET"])
def ping_pong():
    return jsonify({"status": "success", "message": "Events available"})


@events_blueprint.route("/events", methods=["POST"])
def add_event():
    post_data = request.get_json()
    response_object = {"status": "fail", "message": "Invalid payload."}

    if not post_data:
        return jsonify(response_object), 400

    name = post_data.get("name")
    description = post_data.get("description")
    url = post_data.get("url")
    start = post_data.get("start")
    end = post_data.get("end")
    duration = post_data.get("duration")
    topics = post_data.get("topics")
    entries = post_data.get("entry")
    category = post_data.get("category")
    source = post_data.get("source")

    topics_list = extract_topics(topics)
    entry_list = extract_enteries(entries)

    try:
        event = Event.query.filter_by(name=name, start=start).first()
        if not event:
            event = Event(
                name=name,
                description=description,
                url=url,
                start=start,
                end=end,
                duration=duration,
                topics=topics_list,
                entry=entry_list,
                category=category,
                source=source,
            )
            db.session.add(event)
            db.session.commit()

            response_object["status"] = "success"
            response_object["message"] = f"{name} was added!"

            return jsonify(response_object), 201
        else:
            response_object["message"] = "Sorry. That id already exists."
            return jsonify(response_object), 202
    except (exc.IntegrityError, ValueError):
        db.session.rollback()
        return jsonify(response_object), 400
    except exc.IntegrityError:
        db.session.rollback()
        return jsonify(response_object), 400


@events_blueprint.route("/events/<event_id>", methods=["GET"])
def get_single_event(event_id):
    """Get single event details"""
    response_object = {"status": "fail", "message": "Event does not exist"}
    try:
        event = Event.query.filter_by(id=int(event_id)).first()
        if not event:
            return jsonify(response_object), 404
        else:
            response_object = {"status": "success", "data": event.to_dict()}
            return jsonify(response_object), 200
    except ValueError:
        return jsonify(response_object), 404


@events_blueprint.route("/events", methods=["GET"])
@cache.cached(timeout=1000, query_string=True)
def get_all_events():
    """Get all events"""

    page = request.args.get("page", 1, type=int)
    page_size = request.args.get("page_size", DEFAULT_PAGE_SIZE, type=int)

    current_time = datetime.utcnow()
    recent_past = current_time - timedelta(hours=6)

    upcoming_events = (
        Event.query.filter(Event.start > current_time)
        .order_by(Event.start)
        .paginate(page, page_size, error_out=False)
        .items
    )
    recent_events = (
        Event.query.filter(
            and_(Event.start <= current_time, Event.start >= recent_past)
        )
        .filter(Event.deleted is None)
        .order_by(Event.start)
        .limit(DEFAULT_PAGE_SIZE)
    )

    response_object = {
        "status": "success",
        "data": {
            "upcoming_events": [event.to_dict() for event in upcoming_events],
            "recent_events": [event.to_dict() for event in recent_events],
        },
    }
    return jsonify(response_object), 200

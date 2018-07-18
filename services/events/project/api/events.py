# std lib
from datetime import datetime, timedelta

# 3rd party
from sqlalchemy import exc, and_
from flask import Blueprint, jsonify, request

# local
from project.api.models import Event
from project import db


events_blueprint = Blueprint("events", __name__)


@events_blueprint.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        name = request.form["name"]
        created = request.form["created"]
        status = request.form["status"]
        photo_url = request.form["photo_url"]
        event_url = request.form["event_url"]
        description = request.form["description"]
        group_name = request.form["group_name"]
        member_type = request.form["member_type"]
        time = request.form["time"]
        source = request.form["source"]

        event = Event(
            name=name,
            created=created,
            status=status,
            photo_url=photo_url,
            event_url=event_url,
            description=description,
            group_name=group_name,
            member_type=member_type,
            time=time,
            source=source,
        )

        db.session.add(event)

        db.session.commit()

    events = Event.query.all()

    response_object = {
        "status": "success",
        "data": {"events": [event.to_json() for event in events]},
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

    id = post_data.get("id")
    name = post_data.get("name")
    created = post_data.get("created")
    status = post_data.get("status")
    photo_url = post_data.get("photo_url")
    event_url = post_data.get("event_url")
    description = post_data.get("description")
    group_name = post_data.get("group_name")
    member_type = post_data.get("member_type")
    time = (post_data.get("time"),)
    source = post_data.get("source")

    try:
        event = Event.query.filter_by(id=id).first()
        if not event:
            event = Event(
                id=id,
                name=name,
                created=created,
                status=status,
                photo_url=photo_url,
                event_url=event_url,
                description=description,
                group_name=group_name,
                member_type=member_type,
                time=time,
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
            response_object = {
                "status": "success",
                "data": {
                    "id": event.id,
                    "name": event.name,
                    "created": event.created,
                    "status": event.status,
                    "photo_url": event.photo_url,
                    "event_url": event.event_url,
                    "description": event.description,
                    "group_name": event.group_name,
                    "member_type": event.member_type,
                    "time": event.time,
                    "source": event.source,
                },
            }
            return jsonify(response_object), 200
    except ValueError:
        return jsonify(response_object), 404


@events_blueprint.route("/events", methods=["GET"])
def get_all_events():
    """Get all events"""

    current_time = datetime.utcnow()
    recent_past = current_time - timedelta(hours=6)

    upcoming_events = Event.query.filter(Event.time > current_time).all()
    recent_events = Event.query.filter(
        and_(Event.time <= current_time, Event.time >= recent_past)
    ).all()

    response_object = {
        "status": "success",
        "data": {
            "upcoming_events": [event.to_json() for event in upcoming_events],
            "recent_events": [event.to_json() for event in recent_events],
        },
    }
    return jsonify(response_object), 200

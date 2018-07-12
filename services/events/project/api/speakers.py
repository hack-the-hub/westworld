# 3rd party
from sqlalchemy import exc
from flask import Blueprint, jsonify, request

# local
from project.api.models import Speaker
from project import db


speakers_blueprint = Blueprint("speakers", __name__)


@speakers_blueprint.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        name = request.form["name"]
        image = request.form["image"]
        contact = request.form["contact"]
        role = request.form["role"]
        topics = request.form["topics"]
        diversification = request.form["diversification"]
        location = request.form["location"]
        source = request.form["source"]

        speaker = Speaker(
            name=name,
            image=image,
            contact=contact,
            role=role,
            topics=topics,
            diversification=diversification,
            location=location,
            source=source,
        )

        db.session.add(speaker)
        db.session.commit()

    speakers = Speaker.query.all()

    response_object = {
        "status": "success",
        "data": {"speakers": [speaker.to_json() for speaker in speakers]},
    }
    return jsonify(response_object), 200


@speakers_blueprint.route("/status", methods=["GET"])
def ping_pong():
    return jsonify({"status": "success", "message": "Speakers available"})


@speakers_blueprint.route("/speakers", methods=["POST"])
def add_speaker():
    data = request.get_json()
    response_object = {"status": "fail", "message": "Invalid payload."}
    if not data:
        return jsonify(response_object), 400

    name = data.get("name")
    image = data.get("image")
    contact = data.get("contact")
    role = data.get("role")
    topics = data.get("topics")
    diversification = data.get("diversification")
    location = data.get("location")
    source = data.get("source")

    try:
        speaker = Speaker.query.filter_by(name=name).first()
        if not speaker:
            speaker = Speaker(
                name=name,
                image=image,
                contact=contact,
                role=role,
                topics=topics,
                diversification=diversification,
                location=location,
                source=source,
            )

            db.session.add(speaker)
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


@speakers_blueprint.route("/speakers/<name>", methods=["GET"])
def get_single_speaker(name):
    """Get single speaker details"""
    response_object = {"status": "fail", "message": "Speaker does not exist"}
    try:
        speaker = Speaker.query.filter_by(name=name).first()
        if not speaker:
            return jsonify(response_object), 404
        else:
            response_object = {"status": "success", "data": speaker.to_json()}
            return jsonify(response_object), 200
    except ValueError:
        return jsonify(response_object), 404


@speakers_blueprint.route("/speakers", methods=["GET"])
def get_all_speakers():
    """Get all speakers"""
    upcoming_speakers = Speaker.query.all()

    response_object = {
        "status": "success",
        "data": [speaker.to_json() for speaker in upcoming_speakers],
    }
    return jsonify(response_object), 200

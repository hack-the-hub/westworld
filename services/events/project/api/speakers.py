# 3rd party
from sqlalchemy import exc
from flask import Blueprint, jsonify, request

# local
from project.api.models import Speaker
from project.api.models import Topic
from project.api.models import Diversity
from project import db


speakers_blueprint = Blueprint("speakers", __name__)


def extract_topics(topics):
    """Creates a list of topics from a given list."""
    topics_list = []
    for topic in topics:
        topics_list.append(Topic(name=str(topic)))
    return topics_list


def extract_diversification(diversification):
    """Creates a list of diversification from a given list."""
    diversification_list = []
    for diversity in diversification:
        diversification_list.append(Diversity(name=diversity, description=""))
    return diversification_list


@speakers_blueprint.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        name = request.form["name"]
        avatar = request.form["avatar"]
        bio = request.form["bio"]
        contact = request.form["contact"]
        role = request.form["role"]
        topics = request.form["topics"]
        diversification = request.form["diversification"]
        location = request.form["location"]
        source = request.form["source"]

        topic_list = extract_topics(topics)
        diversification_list = extract_diversification(diversification)

        speaker = Speaker(
            name=name,
            avatar=avatar,
            bio=bio,
            contact=contact,
            role=role,
            topics=topic_list,
            diversification=diversification_list,
            location=location,
            source=source,
        )
        print("speaker")
        print(speaker)

        db.session.add(speaker)
        db.session.commit()

    speakers = Speaker.query.all()

    response_object = {
        "status": "success",
        "data": {"speakers": [speaker.to_dict() for speaker in speakers]},
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
    avatar = data.get("avatar")
    bio = data.get("bio")
    contact = data.get("contact")
    role = data.get("role")
    topics = data.get("topics")
    diversification = data.get("diversification")
    location = data.get("location")
    source = data.get("source")

    topic_list = extract_topics(topics)
    diversification_list = extract_diversification(diversification)

    try:
        speaker = Speaker.query.filter_by(name=name).first()
        if not speaker:
            speaker = Speaker(
                name=name,
                avatar=avatar,
                bio=bio,
                contact=contact,
                role=role,
                topics=topic_list,
                diversification=diversification_list,
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
            response_object = {"status": "success", "data": speaker.to_dict()}
            return jsonify(response_object), 200
    except ValueError:
        return jsonify(response_object), 404


@speakers_blueprint.route("/speakers", methods=["GET"])
def get_all_speakers():
    """Get all speakers"""
    upcoming_speakers = Speaker.query.all()

    response_object = {
        "status": "success",
        "data": [speaker.to_dict() for speaker in upcoming_speakers],
    }
    return jsonify(response_object), 200

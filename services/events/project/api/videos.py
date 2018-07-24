# std lib
from datetime import datetime

# 3rd party
from sqlalchemy import exc
from flask import Blueprint, jsonify, request

# local
from project.api.models import Video
from project.api.models import Topic
from project.api.models import Channel
from project import db


videos_blueprint = Blueprint("videos", __name__)


def extract_topics(topics):
    """Creates a list of topics from a given list."""
    topics_list = []
    for topic in topics:
        if topic:
            topics_list.append(Topic(name=str(topic)))
    return topics_list


def extract_channels(channels):
    results = []
    for value in channels:
        if value:
            results.append(value)
    return results


@videos_blueprint.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        name = request.form["name"]
        url = request.form["url"]
        description = request.form["description"]
        topics = request.form["topics"]
        channel = request.form["channel"]
        source = request.form["source"]

        topic_list = extract_topics(topics)

        video_channels = []
        channel = Channel(
            name=channel,
            url="http://youtube.com",
            description="",
            topics=topic_list,
            source=source,
        )
        video_channels.append(channel)

        video = Video(
            name=name,
            url=url,
            description=description,
            topics=topic_list,
            channel=video_channels,
            source=source,
        )

        db.session.add(video)
        db.session.commit()

    videos = Video.query.all()

    response_object = {
        "status": "success",
        "data": {"videos": [video.to_dict() for video in videos]},
    }
    return jsonify(response_object), 200


@videos_blueprint.route("/status", methods=["GET"])
def ping_pong():
    return jsonify({"status": "success", "message": "Videos available"})


@videos_blueprint.route("/videos", methods=["POST"])
def add_video():
    post_data = request.get_json()
    response_object = {"status": "fail", "message": "Invalid payload."}
    if not post_data:
        return jsonify(response_object), 400

    name = post_data.get("name")
    url = post_data.get("url")
    description = post_data.get("description")
    topics = post_data.get("topics")
    channel = post_data.get("channel")
    source = post_data.get("source")
    created = post_data.get("created")

    topic_list = extract_topics(topics)

    video_channels = []
    channel = Channel(
        name=channel,
        url="http://youtube.com",
        description="",
        topics=topic_list,
        source=source,
    )
    video_channels.append(channel)

    try:
        video = Video.query.filter_by(name=name).first()
        if not video:
            video = Video(
                name=name,
                url=url,
                description=description,
                topics=topic_list,
                channel=video_channels,
                source=source,
                created=created,
            )

            db.session.add(video)
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


@videos_blueprint.route("/videos/<video_name>", methods=["GET"])
def get_single_video(video_name):
    """Get single video details"""
    response_object = {"status": "fail", "message": "Video does not exist"}
    try:
        video = Video.query.filter_by(name=video_name).first()
        if not video:
            return jsonify(response_object), 404
        else:
            response_object = {
                "status": "success",
                "data": {
                    "name": video.name,
                    "url": video.url,
                    "description": video.description,
                    "topics": video.topics,
                    "source": video.source,
                },
            }
            return jsonify(response_object), 200
    except ValueError:
        return jsonify(response_object), 404


@videos_blueprint.route("/videos", methods=["GET"])
def get_all_videos():
    """Get all videos"""
    oldest_allowed_records = datetime(2017, 1, 1, 00, 00, 00)

    upcoming_videos = Video.query.filter(Video.created > oldest_allowed_records).all()

    response_object = {
        "status": "success",
        "data": [video.to_dict() for video in upcoming_videos],
    }
    return jsonify(response_object), 200

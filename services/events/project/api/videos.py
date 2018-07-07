# std lib
from datetime import datetime

# 3rd party
from sqlalchemy import exc
from flask import Blueprint, jsonify, request

# local
from project.api.models import Video
from project import db


videos_blueprint = Blueprint("videos", __name__)


@videos_blueprint.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        id = request.form["id"]
        name = request.form["name"]
        created = request.form["created"]
        url = request.form["url"]
        description = request.form["description"]
        channel = request.form["channel"]
        source = request.form["source"]

        video = Video(
            id=id,
            name=name,
            created=created,
            url=url,
            description=description,
            channel=channel,
            source=source,
        )

        db.session.add(video)
        db.session.commit()

    videos = Video.query.all()

    response_object = {
        "status": "success",
        "data": {"videos": [video.to_json() for video in videos]},
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

    id = post_data.get("id")
    name = post_data.get("name")
    created = post_data.get("created")
    url = post_data.get("url")
    description = post_data.get("description")
    channel = post_data.get("channel")
    source = post_data.get("source")

    try:
        video = Video.query.filter_by(id=id).first()
        if not video:
            video = Video(
                id=id,
                name=name,
                created=created,
                url=url,
                description=description,
                channel=channel,
                source=source,
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


@videos_blueprint.route("/videos/<video_id>", methods=["GET"])
def get_single_video(video_id):
    """Get single video details"""
    response_object = {"status": "fail", "message": "Video does not exist"}
    try:
        video = Video.query.filter_by(id=int(video_id)).first()
        if not video:
            return jsonify(response_object), 404
        else:
            response_object = {
                "status": "success",
                "data": {
                    "id": video.id,
                    "name": video.name,
                    "created": video.created,
                    "url": video.url,
                    "description": video.description,
                    "channel": video.channel,
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
        "data": [video.to_json() for video in upcoming_videos],
    }
    return jsonify(response_object), 200

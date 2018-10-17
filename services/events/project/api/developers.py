# 3rd party
from sqlalchemy import exc
from flask import Blueprint, jsonify, request

# local
from project.api.models import Developer
from project.api.models import Topic
from project import db


developers_blueprint = Blueprint("developers", __name__)


def extract_topics(topics):
    """Creates a list of topics from a given list."""
    topics_list = []
    for topic in topics:
        topics_list.append(Topic(name=str(topic)))
    return topics_list


@developers_blueprint.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        name = request.form["name"]
        avatar = request.form["avatar"]
        bio = request.form["bio"]
        blog = request.form["blog"]
        company = request.form["company"]
        login = request.form["login"]
        gists = request.form["gists"]
        repositories = request.form["repositories"]
        followers = request.form["followers"]
        url = request.form["url"]
        topics = request.form["topics"]
        location = request.form["location"]
        source = request.form["source"]

        topic_list = extract_topics(topics)

        developer = Developer(
            name=name,
            avatar=avatar,
            bio=bio,
            blog=blog,
            company=company,
            login=login,
            gists=gists,
            repositories=repositories,
            followers=followers,
            url=url,
            topics=topic_list,
            location=location,
            source=source,
        )
        print("developer")
        print(developer)

        db.session.add(developer)
        db.session.commit()

    developers = Developer.query.all()

    response_object = {
        "status": "success",
        "data": {"developers": [developer.to_dict() for developer in developers]},
    }
    return jsonify(response_object), 200


@developers_blueprint.route("/status", methods=["GET"])
def ping_pong():
    return jsonify({"status": "success", "message": "Developers available"})


@developers_blueprint.route("/developers", methods=["POST"])
def add_developer():
    data = request.get_json()
    response_object = {"status": "fail", "message": "Invalid payload."}
    if not data:
        return jsonify(response_object), 400

    name = data.get("name")
    avatar = data.get("avatar")
    bio = data.get("bio")
    blog = data.get("blog")
    company = data.get("company")
    login = data.get("login")
    gists = data.get("gists")
    repositories = data.get("repositories")
    followers = data.get("followers")
    url = data.get("url")
    topics = data.get("topics")
    location = data.get("location")
    source = data.get("source")

    topic_list = extract_topics(topics)

    try:
        developer = Developer.query.filter_by(name=name).first()
        if not developer:
            developer = Developer(
                name=name,
                avatar=avatar,
                bio=bio,
                blog=blog,
                company=company,
                login=login,
                gists=gists,
                repositories=repositories,
                followers=followers,
                url=url,
                topics=topic_list,
                location=location,
                source=source,
            )

            db.session.add(developer)
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


@developers_blueprint.route("/developers/<name>", methods=["GET"])
def get_single_developer(name):
    """Get single developer details"""
    response_object = {"status": "fail", "message": "Developer does not exist"}
    try:
        developer = Developer.query.filter_by(name=name).first()
        if not developer:
            return jsonify(response_object), 404
        else:
            response_object = {"status": "success", "data": developer.to_dict()}
            return jsonify(response_object), 200
    except ValueError:
        return jsonify(response_object), 404


@developers_blueprint.route("/developers", methods=["GET"])
def get_all_developers():
    """Get all developers"""
    upcoming_developers = Developer.query.all()

    response_object = {
        "status": "success",
        "data": [developer.to_dict() for developer in upcoming_developers],
    }
    return jsonify(response_object), 200

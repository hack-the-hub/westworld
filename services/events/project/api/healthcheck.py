# 3rd party
from flask import Blueprint, jsonify


healthcheck_blueprint = Blueprint("healthcheck", __name__)


@healthcheck_blueprint.route("/status", methods=["GET"])
def status():
    return jsonify({"status": "success", "message": "Service available"})

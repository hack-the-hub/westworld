from flask import Blueprint, jsonify
import json
import os


meetups_blueprint = Blueprint('meetups', __name__, template_folder='./templates')


@meetups_blueprint.route('/meetups/names', methods=['GET'])
def get_meetups():
    with open('/usr/src/app/project/data/meetups/meetups_belfast.json') as file:
        meetups_json = json.load(file)

    meetup_names = []
    for meetup in meetups_json:
        meetup_names.append(meetup['name'])

    return jsonify({
        'status': 'success',
        'content': meetup_names
    })
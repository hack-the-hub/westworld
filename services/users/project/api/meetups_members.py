from flask import Blueprint, jsonify, abort
import json


meetup_members_blueprint = Blueprint(
    'meetups_members', __name__, template_folder='./templates')


@meetup_members_blueprint.route('/meetups_members/', methods=['GET'])
def get_members_all():
    with open('/usr/src/app/project/data/members/unique_members.json', 'r') as file:
        meetups_json = json.load(file)

    return jsonify({
        'results': meetups_json
    })


@meetup_members_blueprint.route('/meetups_members/<meetup_id>', methods=['GET'])
def get_members_by_id(meetup_id):
    with open('/usr/src/app/project/data/members/unique_members.json', 'r') as file:
        meetups_json = json.load(file)

    member = meetups_json.get(meetup_id, None)

    if not member:
        return abort(404)

    return jsonify({
        'results': member
    })

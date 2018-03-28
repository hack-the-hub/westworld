from flask import Blueprint, jsonify, abort
import json
import os


meetups_blueprint = Blueprint(
    'meetups', __name__, template_folder='./templates')


@meetups_blueprint.route('/meetups/', methods=['GET'])
def get_meetups():
    with open('/usr/src/app/project/data/meetups/meetups_belfast.json', 'r') as file:
        meetups_json = json.load(file)

    return jsonify({
        'results': meetups_json
    })


@meetups_blueprint.route('/meetups/<int:meetup_id>', methods=['GET'])
def get_meetups_by_id(meetup_id):
    with open('/usr/src/app/project/data/meetups/meetups_belfast.json') as file:
        meetups_json = json.load(file)

        meetup = [item for item in meetups_json if item["id"] == meetup_id]

        if not meetup:
            return abort(404)

        return jsonify({
            'results': meetup[0]
        })


@meetups_blueprint.route('/meetups/<meetup_id>/members', methods=['GET'])
def get_meetups_members_by_meetup_id(meetup_id):
    filename = None

    for file in os.listdir('/usr/src/app/project/data/meetups_members/'):
        if meetup_id in file:
            filename = file
            break

    if not filename:
        return abort(404)

    with open('/usr/src/app/project/data/meetups_members/%s' % filename) as file:
        member_json = json.load(file)

    return jsonify({
        'results': member_json
    })

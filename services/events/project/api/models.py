# stdlib
import datetime
import jwt

# 3rd party imports
from flask import current_app

# local imports
from project import db


class Event(db.Model):
    __tablename__ = "events"
    id = db.Column(db.String(32), primary_key=True)
    name = db.Column(db.String(128), nullable=False)
    created = db.Column(db.DateTime, nullable=False)
    status = db.Column(db.String(20), nullable=False)
    photo_url = db.Column(db.String(256), nullable=False)
    event_url = db.Column(db.String(256), nullable=False)
    description = db.Column(db.String(50000), nullable=False)
    group_name = db.Column(db.String(128), nullable=False)
    member_type = db.Column(db.String(128), nullable=False)
    time = db.Column(db.DateTime, nullable=False)
    source = db.Column(db.String(10), nullable=False)

    def __init__(self, id, name, created, status, photo_url, event_url, description, group_name, member_type, time, source):
        self.id = id
        self.name = name
        self.created = created
        self.status = status
        self.photo_url = photo_url
        self.event_url = event_url
        self.description = description
        self.group_name = group_name
        self.member_type = member_type
        self.time = time
        self.source = source

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name,
            'created': self.created,
            'status': self.status,
            'photo_url': self.photo_url,
            'event_url': self.event_url,
            'description': self.description,
            'group_name': self.group_name,
            'member_type': self.member_type,
            'time': self.time,
            'source': self.source
        }

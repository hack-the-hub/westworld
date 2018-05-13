# stdlib
import datetime
import jwt

# 3rd party imports
from flask import current_app

# local imports
from project import db


class Event(db.Model):
    __tablename__ = "events"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), unique=True, nullable=False)
    created = db.Column(db.DateTime, nullable=False)
    status = db.Column(db.String(20), nullable=False)
    photo_url = db.Column(db.String(256), nullable=False)
    event_url = db.Column(db.String(256), nullable=False)
    description = db.Column(db.String(1024), nullable=False)

    def __init__(self, id, name, created, status, photo_url, event_url, description):
        self.id = id
        self.name = name
        self.created = created
        self.status = status
        self.photo_url = photo_url
        self.event_url = event_url
        self.description = description

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name,
            'created': self.created,
            'status': self.status,
            'photo_url': self.photo_url,
            'event_url': self.event_url,
            'description': self.description
        }

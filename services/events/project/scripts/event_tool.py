from project import db
from project.api.models import Event
from datetime import datetime


def soft_delete_events(source):
    deleted_at = datetime.now().isoformat()
    events = Event.query.filter(Event.source == source).all()

    for event in events:
        updated_at = datetime.now().isoformat()
        event.updated = updated_at
        event.deleted = deleted_at
        db.session.add(event)
        db.session.commit()


def delete_events(source):
    events = Event.query.filter(Event.source == source).all()

    for event in events:
        db.session.delete(event)
        db.session.commit()

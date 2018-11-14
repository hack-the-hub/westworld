from project import db
from project.api.models import Meetup
from project.api.models import Event


def create_meetups():
    events = Event.query.all()

    for event in events:
        meetup = Meetup.query.filter_by(name=event.category).first()

        if meetup:
            meetup.events.append(event)
            print(f"updating meetup {meetup.name}")
        else:
            meetup = Meetup(
                name=event.category,
                logo="",
                url="",
                description="",
                topics=[],
                events=[],
                channel=[],
                source=event.source,
            )
            print(f"created meetup {meetup.name}")

        db.session.add(meetup)
        db.session.commit()

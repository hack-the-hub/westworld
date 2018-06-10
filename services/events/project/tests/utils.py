from project import db
from project.api.models import Event


def add_event(
    id,
    name,
    created,
    status,
    photo_url,
    event_url,
    description,
    group_name,
    member_type,
    time,
    source,
):
    event = Event(
        id=id,
        name=name,
        created=created,
        status=status,
        photo_url=photo_url,
        event_url=event_url,
        description=description,
        group_name=group_name,
        member_type=member_type,
        time=time,
        source=source,
    )
    db.session.add(event)
    db.session.commit()
    return event

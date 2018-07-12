from project import db
from project.api.models import Event
from project.api.models import Video
from project.api.models import Speaker


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


def add_video(id, name, created, url, description, channel, source):
    video = Video(
        id=id,
        name=name,
        created=created,
        url=url,
        description=description,
        channel=channel,
        source=source,
    )
    db.session.add(video)
    db.session.commit()
    return video


def add_speaker(name, image, contact, role, topics, diversification, location, source):
    speaker = Speaker(
        name=name,
        image=image,
        contact=contact,
        role=role,
        topics=topics,
        diversification=diversification,
        location=location,
        source=source,
    )
    db.session.add(speaker)
    db.session.commit()
    return speaker

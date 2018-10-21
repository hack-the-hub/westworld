from project import db
from project.api.models import Developer
from project.api.models import Event
from project.api.models import Video
from project.api.models import Speaker


def add_event(
    name,
    description,
    url,
    start,
    end,
    duration,
    topics,
    entry,
    location,
    channel,
    category,
    source,
):
    event = Event(
        name=name,
        description=description,
        url=url,
        start=start,
        end=end,
        duration=duration,
        topics=topics,
        entry=entry,
        location=location,
        channel=channel,
        category=category,
        source=source,
    )
    db.session.add(event)
    db.session.commit()
    return event


def add_video(name, url, description, topics, channel, source):
    video = Video(
        name=name,
        url=url,
        description=description,
        topics=topics,
        channel=channel,
        source=source,
    )
    db.session.add(video)
    db.session.commit()
    return video


def add_speaker(
    name, avatar, bio, contact, role, topics, diversification, location, source
):
    speaker = Speaker(
        name=name,
        avatar=avatar,
        bio=bio,
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


def add_developer(
    name,
    avatar,
    bio,
    blog,
    company,
    login,
    gists,
    repositories,
    followers,
    url,
    topics,
    location,
    source,
):
    developer = Developer(
        name=name,
        avatar=avatar,
        bio=bio,
        blog=blog,
        company=company,
        login=login,
        gists=gists,
        repositories=repositories,
        followers=followers,
        url=url,
        topics=topics,
        location=location,
        source=source,
    )
    db.session.add(developer)
    db.session.commit()
    return developer

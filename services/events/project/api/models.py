# std stdlib
from datetime import datetime

# 3rd party imports
import sqlalchemy
from sqlalchemy.dialects.postgresql import UUID, ARRAY


# local imports
from project import db

from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


event_topic_table = db.Table(
    "event_topic_association",
    db.Model.metadata,
    Column("event_id", UUID(as_uuid=True), ForeignKey("event.id")),
    Column("topic_id", UUID(as_uuid=True), ForeignKey("topic.id")),
)

video_topic_table = db.Table(
    "video_topic_association",
    db.Model.metadata,
    Column("video_id", UUID(as_uuid=True), ForeignKey("video.id")),
    Column("topic_id", UUID(as_uuid=True), ForeignKey("topic.id")),
)

meetup_topic_table = db.Table(
    "meetup_topic_association",
    db.Model.metadata,
    Column("meetup_id", UUID(as_uuid=True), ForeignKey("meetup.id")),
    Column("topic_id", UUID(as_uuid=True), ForeignKey("topic.id")),
)

speaker_topic_table = db.Table(
    "speaker_topic_association",
    db.Model.metadata,
    Column("speaker_id", UUID(as_uuid=True), ForeignKey("speaker.id")),
    Column("topic_id", UUID(as_uuid=True), ForeignKey("topic.id")),
)

channel_topic_table = db.Table(
    "channel_topic_association",
    db.Model.metadata,
    Column("channel_id", UUID(as_uuid=True), ForeignKey("channel.id")),
    Column("topic_id", UUID(as_uuid=True), ForeignKey("topic.id")),
)

event_entry_table = db.Table(
    "event_entry_association",
    db.Model.metadata,
    Column("event_id", UUID(as_uuid=True), ForeignKey("event.id")),
    Column("entry_id", UUID(as_uuid=True), ForeignKey("entry.id")),
)

event_meetup_table = db.Table(
    "event_meetup_association",
    db.Model.metadata,
    Column("event_id", UUID(as_uuid=True), ForeignKey("event.id")),
    Column("meetup_id", UUID(as_uuid=True), ForeignKey("meetup.id")),
)

meetup_event_table = db.Table(
    "meetup_event_association",
    db.Model.metadata,
    Column("meetup_id", UUID(as_uuid=True), ForeignKey("meetup.id")),
    Column("event_id", UUID(as_uuid=True), ForeignKey("event.id")),
)

meetup_channel_table = db.Table(
    "meetup_channel_association",
    db.Model.metadata,
    Column("meetup_id", UUID(as_uuid=True), ForeignKey("meetup.id")),
    Column("channel_id", UUID(as_uuid=True), ForeignKey("channel.id")),
)

video_channel_table = db.Table(
    "video_channel_association",
    db.Model.metadata,
    Column("video_id", UUID(as_uuid=True), ForeignKey("video.id")),
    Column("channel_id", UUID(as_uuid=True), ForeignKey("channel.id")),
)

speaker_diversity_table = db.Table(
    "speaker_diversity_association",
    db.Model.metadata,
    Column("speaker_id", UUID(as_uuid=True), ForeignKey("speaker.id")),
    Column("diversity_id", UUID(as_uuid=True), ForeignKey("diversity.id")),
)


class Diversity(db.Model):
    __tablename__ = "diversity"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        server_default=sqlalchemy.text("uuid_generate_v4()"),
    )
    name = Column(db.String(128), nullable=False)
    description = Column(db.String(1000), nullable=False)

    def __init__(self, name, description):
        self.name = name
        self.description = description

    def to_json(self):
        return {"id": self.id, "name": self.name, "description": self.description}


class Topic(db.Model):
    __tablename__ = "topic"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        server_default=sqlalchemy.text("uuid_generate_v4()"),
    )
    name = Column(db.String(128), nullable=False)
    description = Column(db.String(1000), nullable=False)
    abbreviation = Column(db.String(10), nullable=False)

    def __init__(self, name, description, abbreviation):
        self.name = name
        self.description = description
        self.abbreviation = abbreviation

    def to_json(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "abbreviation": self.abbreviation,
        }


class Entry(db.Model):
    __tablename__ = "entry"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        server_default=sqlalchemy.text("uuid_generate_v4()"),
    )
    type = Column(db.String(128), nullable=False)
    description = Column(db.String(1000), nullable=False)

    def __init__(self, type, description):
        self.type = type
        self.description = description

    def to_json(self):
        return {"id": self.id, "type": self.type, "description": self.description}


class Event(db.Model):
    __tablename__ = "event"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        server_default=sqlalchemy.text("uuid_generate_v4()"),
    )
    name = Column(db.String(128), nullable=False)
    description = Column(db.String(50000), nullable=False)
    url = Column(db.String(2048), nullable=False)
    start = Column(db.DateTime, nullable=False)
    end = Column(db.DateTime, nullable=False)
    duration = Column(Integer, nullable=False)
    topics = relationship("Topic", secondary=event_topic_table)
    entry = relationship("Entry", secondary=event_entry_table)
    created = Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated = Column(db.DateTime, default=datetime.utcnow, nullable=False)
    deleted = Column(db.DateTime, nullable=True)
    source = Column(db.String(50), nullable=False)

    def __init__(
        self,
        name,
        description,
        url,
        start,
        end,
        duration,
        topics,
        entry,
        channel,
        source,
    ):
        self.name = name
        self.description = description
        self.url = url
        self.start = start
        self.end = end
        self.duration = duration
        self.topics = topics
        self.entry = entry
        self.channel = channel
        self.source = source

    def to_json(self):
        return {
            "name": self.name,
            "description": self.description,
            "url": self.url,
            "start": self.start,
            "end": self.end,
            "duration": self.duration,
            "topics": self.topics,
            "entry": self.entry,
            "channel": self.channel,
            "source": self.source,
        }


class Channel(db.Model):
    __tablename__ = "channel"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        server_default=sqlalchemy.text("uuid_generate_v4()"),
    )
    name = Column(db.String(128), nullable=False)
    url = Column(db.String(2048), nullable=False)
    description = Column(db.String(50000), nullable=False)
    topics = relationship("Topic", secondary=channel_topic_table)
    created = Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated = Column(db.DateTime, default=datetime.utcnow, nullable=False)
    deleted = Column(db.DateTime, nullable=True)
    source = Column(db.String(50), nullable=False)

    def __init__(self, name, url, description, topics, source):
        self.name = name
        self.url = url
        self.description = description
        self.topics = topics
        self.source = source

    def to_json(self):
        return {
            "id": self.id,
            "name": self.name,
            "url": self.url,
            "description": self.description,
            "topics": self.topics,
            "created": self.created.isoformat(),
            "udpated": self.created.isoformat(),
            "deleted": self.created.isoformat(),
            "source": self.source,
        }


class Video(db.Model):
    __tablename__ = "video"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        server_default=sqlalchemy.text("uuid_generate_v4()"),
    )
    name = Column(db.String(128), nullable=False)
    url = Column(db.String(2048), nullable=False)
    description = Column(db.String(50000), nullable=False)
    topics = relationship("Topic", secondary=video_topic_table)
    channel = relationship("Channel", secondary=video_channel_table)
    created = Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated = Column(db.DateTime, default=datetime.utcnow, nullable=False)
    deleted = Column(db.DateTime, nullable=True)
    source = Column(db.String(50), nullable=False)

    def __init__(self, name, url, description, topics, channel, source):
        self.name = name
        self.url = url
        self.description = description
        self.topics = topics
        self.channel = channel
        self.source = source

    def to_json(self):
        return {
            "id": self.id,
            "name": self.name,
            "url": self.url,
            "description": self.description,
            "topics": self.topics,
            "channel": self.channel,
            "created": self.created.isoformat(),
            "udpated": self.created.isoformat(),
            "deleted": self.created.isoformat(),
            "source": self.source,
        }


class Meetup(db.Model):
    __tablename__ = "meetup"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        server_default=sqlalchemy.text("uuid_generate_v4()"),
    )
    name = Column(db.String(128), nullable=False)
    logo = Column(db.String(1000), nullable=False)
    url = Column(db.String(2048), nullable=False)
    description = Column(db.String(50000), nullable=False)
    topics = relationship("Topic", secondary=meetup_topic_table)
    events = relationship("Event", secondary=meetup_event_table)
    channel = relationship("Channel", secondary=meetup_channel_table)
    created = Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated = Column(db.DateTime, default=datetime.utcnow, nullable=False)
    deleted = Column(db.DateTime, nullable=True)
    source = Column(db.String(50), nullable=False)

    def __init__(self, name, logo, url, description, topics, events, channel, source):
        self.name = name
        self.logo = logo
        self.url = url
        self.description = description
        self.topics = topics
        self.events = events
        self.channel = channel
        self.source = source

    def to_json(self):
        return {
            "id": self.id,
            "name": self.name,
            "logo": self.logo,
            "url": self.url,
            "description": self.description,
            "topics": self.topics,
            "events": self.events,
            "channel": self.channel,
            "created": self.created.isoformat(),
            "udpated": self.created.isoformat(),
            "deleted": self.created.isoformat(),
            "source": self.source,
        }


class Speaker(db.Model):
    __tablename__ = "speaker"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        server_default=sqlalchemy.text("uuid_generate_v4()"),
    )
    name = Column(db.String(128), nullable=False)
    avatar = Column(db.String(1024), nullable=False)
    bio = Column(db.String(1024), nullable=False)
    contact = Column(db.String(128), nullable=False)
    role = Column(db.String(128), nullable=False)
    topics = relationship("Topic", secondary=speaker_topic_table)
    diversification = relationship("Diversity", secondary=speaker_diversity_table)
    location = Column(db.String(128), nullable=False)
    created = Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated = Column(db.DateTime, default=datetime.utcnow, nullable=False)
    deleted = Column(db.DateTime, nullable=True)
    source = Column(db.String(50), nullable=False)

    def __init__(
        self,
        name,
        avatar,
        bio,
        contact,
        role,
        topics,
        diversification,
        location,
        source,
    ):
        self.name = name
        self.avatar = avatar
        self.bio = bio
        self.contact = contact
        self.role = role
        self.topics = topics
        self.diversification = diversification
        self.location = location
        self.source = source

    def to_json(self):
        return {
            "id": self.id,
            "name": self.name,
            "avatar": self.avatar,
            "bio": self.bio,
            "contact": self.contact,
            "role": self.role,
            "topics": self.topics,
            "diversification": self.diversification,
            "location": self.location,
            "created": self.created.isoformat(),
            "udpated": self.created.isoformat(),
            "deleted": self.created.isoformat(),
            "source": self.source,
        }

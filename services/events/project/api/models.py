# std stdlib
from datetime import datetime

# 3rd party imports
import sqlalchemy
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.ext.declarative import declarative_base

# local imports
from project import db
from project.api.mixins import OutputMixin

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
    Column("video_id", UUID(as_uuid=True), ForeignKey("video.id")),
    Column("channel_id", UUID(as_uuid=True), ForeignKey("channel.id")),
)

speaker_diversity_table = db.Table(
    "speaker_diversity_association",
    db.Model.metadata,
    Column("speaker_id", UUID(as_uuid=True), ForeignKey("speaker.id")),
    Column("diversity_id", UUID(as_uuid=True), ForeignKey("diversity.id")),
)


class Diversity(OutputMixin, db.Model):
    __tablename__ = "diversity"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        server_default=sqlalchemy.text("uuid_generate_v4()"),
    )
    name = Column(db.String(128), nullable=False)
    description = Column(db.String(1000), nullable=True)

    def __init__(self, name, description):
        self.name = name
        self.description = description


class Topic(OutputMixin, db.Model):
    __tablename__ = "topic"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        server_default=sqlalchemy.text("uuid_generate_v4()"),
    )
    name = Column(db.String(128), nullable=False)
    description = Column(db.String(1000), nullable=True)
    abbreviation = Column(db.String(10), nullable=True)

    def __init__(self, name, description=None, abbreviation=None):
        self.name = name
        self.description = description
        self.abbreviation = abbreviation


class Entry(OutputMixin, db.Model):
    __tablename__ = "entry"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        server_default=sqlalchemy.text("uuid_generate_v4()"),
    )
    type = Column(db.String(128), nullable=False)
    description = Column(db.String(1000), nullable=True)

    def __init__(self, type, description=None):
        self.type = type
        self.description = description


class Event(OutputMixin, db.Model):
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
    category = Column(db.String(256), nullable=False)
    topics = db.relationship("Topic", secondary=event_topic_table)
    entry = db.relationship("Entry", secondary=event_entry_table)
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
        category,
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
        self.category = category
        self.source = source


class Channel(OutputMixin, db.Model):
    __tablename__ = "channel"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        server_default=sqlalchemy.text("uuid_generate_v4()"),
    )
    name = Column(db.String(128), nullable=False)
    url = Column(db.String(2048), nullable=False)
    description = Column(db.String(50000), nullable=False)
    topics = db.relationship("Topic", secondary=channel_topic_table)
    created = Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated = Column(db.DateTime, default=datetime.utcnow, nullable=False)
    deleted = Column(db.DateTime, nullable=True)
    source = Column(db.String(50), nullable=False)

    def __init__(self, name, topics, source, url=None, description=None):
        self.name = name
        self.url = url
        self.description = description
        self.topics = topics
        self.source = source


class Video(OutputMixin, db.Model):
    __tablename__ = "video"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        server_default=sqlalchemy.text("uuid_generate_v4()"),
    )
    name = Column(db.String(128), nullable=False)
    url = Column(db.String(2048), nullable=False)
    description = Column(db.String(50000), nullable=False)
    topics = db.relationship(
        "Topic",
        secondary=video_topic_table,
        backref=db.backref("video", lazy="dynamic"),
    )
    channel = db.relationship(
        "Channel",
        secondary=video_channel_table,
        backref=db.backref("video", lazy="dynamic"),
    )
    created = Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated = Column(db.DateTime, default=datetime.utcnow, nullable=False)
    deleted = Column(db.DateTime, nullable=True)
    source = Column(db.String(50), nullable=False)

    def __init__(self, name, url, description, topics, channel, source, created=None):
        self.name = name
        self.url = url
        self.description = description
        self.topics = topics
        self.channel = channel
        self.source = source

        if created:
            self.created = created


class Meetup(OutputMixin, db.Model):
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
    topics = db.relationship(
        "Topic",
        secondary=meetup_topic_table,
        backref=db.backref("meetup", lazy="dynamic"),
    )
    events = db.relationship(
        "Event",
        secondary=meetup_event_table,
        backref=db.backref("meetup", lazy="dynamic"),
    )
    channel = db.relationship(
        "Channel",
        secondary=meetup_channel_table,
        backref=db.backref("meetup", lazy="dynamic"),
    )
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


class Speaker(OutputMixin, db.Model):
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
    topics = db.relationship("Topic", secondary=speaker_topic_table)
    diversification = db.relationship("Diversity", secondary=speaker_diversity_table)
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

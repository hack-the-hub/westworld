from project import db
from project.api.models import Channel
from project.api.models import Event
from project.api.models import Entry
from project.api.models import Meetup
from project.api.models import Topic
from project.tests.base import BaseTestCase


class TestMeetupModel(BaseTestCase):
    def test_add(self):
        topic = Topic(name="Python", description="", abbreviation="py")
        entry = Entry(type="ticket", description="description")
        event = Event(
            name="learning new technologies",
            description="example description",
            url="https://example.com",
            start="2018-06-06 16:15:00Z",
            end="2018-06-06 17:15:00Z",
            duration=100000,
            topics=[topic],
            entry=[entry],
            category="test category",
            source="test",
            location="belfast",
        )
        channel = Channel(
            name="test", url="", description="", topics=[topic], source="test"
        )

        meetup = Meetup(
            name="learning new technologies",
            logo="https://example.com/image",
            url="https://example.com/meetup",
            description="the new shiny",
            topics=[topic],
            events=[event],
            channel=[channel],
            source="test",
        )
        db.session.add(event)
        db.session.commit()

        self.assertEqual(meetup.name, "learning new technologies")
        self.assertEqual(meetup.logo, "https://example.com/image")
        self.assertEqual(meetup.url, "https://example.com/meetup")
        self.assertEqual(meetup.description, "the new shiny")
        self.assertEqual(len(meetup.topics), 1)
        self.assertEqual(len(meetup.events), 1)
        self.assertEqual(len(meetup.channel), 1)

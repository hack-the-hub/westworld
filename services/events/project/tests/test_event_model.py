from datetime import datetime

from project.tests.base import BaseTestCase
from project.tests.utils import add_event

from project.api.models import Topic
from project.api.models import Entry
from project.api.models import Channel


class TestEventModel(BaseTestCase):
    def test_add_event(self):
        topic = Topic(name="Python", description="", abbreviation="py")
        entry = Entry(type="ticket", description="description")
        channel = Channel(
            name="test", url="", description="test", topics=[topic], source="test"
        )

        event = add_event(
            name="learning new technologies",
            description="example description",
            url="https://example.com",
            start="2018-06-06 16:15:00Z",
            end="2018-06-06 17:15:00Z",
            channel=[channel],
            duration=100000,
            topics=[topic],
            entry=[entry],
            source="test",
        )

        self.assertEqual(event.name, "learning new technologies")
        self.assertEqual(event.description, "example description")
        self.assertEqual(event.url, "https://example.com")
        self.assertEqual(event.start, datetime(2018, 6, 6, 16, 15, 00))
        self.assertEqual(event.end, datetime(2018, 6, 6, 17, 15, 00))
        self.assertEqual(event.duration, 100000)

    def test_to_json(self):
        topic = Topic(name="Python", description="", abbreviation="py")
        entry = Entry(type="ticket", description="description")
        channel = Channel(
            name="test", url="", description="test", topics=[topic], source="test"
        )

        event = add_event(
            name="learning new technologies",
            description="example description",
            url="https://example.com",
            start="2018-06-06 16:15:00Z",
            end="2018-06-06 17:15:00Z",
            channel=[channel],
            duration=100000,
            topics=[topic],
            entry=[entry],
            source="test",
        )
        self.assertTrue(isinstance(event.to_json(), dict))

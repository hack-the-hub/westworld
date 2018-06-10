from datetime import datetime
from datetime import timezone

from sqlalchemy.orm.exc import FlushError

from project import db
from project.api.models import Event
from project.tests.base import BaseTestCase
from project.tests.utils import add_event


class TestEventModel(BaseTestCase):
    def test_add_event(self):
        event = add_event(
            id="250383898",
            name="Meetup name",
            created="2018-05-05 14:30:00Z",
            status="upcoming",
            photo_url="http://example.com/photo.jpg",
            event_url="http://example.com/id=1",
            description="A description of the meetup",
            group_name="Meetup Group",
            member_type="Member",
            time="2018-06-06 16:15:00Z",
            source="event source",
        )

        self.assertEqual(event.id, "250383898")
        self.assertEqual(event.name, "Meetup name")
        self.assertEqual(event.created, datetime(2018, 5, 5, 14, 30, 00))
        self.assertEqual(event.status, "upcoming")
        self.assertEqual(event.photo_url, "http://example.com/photo.jpg")
        self.assertEqual(event.event_url, "http://example.com/id=1")
        self.assertEqual(event.group_name, "Meetup Group")
        self.assertEqual(event.member_type, "Member")
        self.assertEqual(event.time, datetime(2018, 6, 6, 16, 15, 00))
        self.assertEqual(event.source, "event source")

    def test_to_json(self):
        event = add_event(
            id="1",
            name="Meetup name",
            created="2018-02-16 14:22:09Z",
            status="upcoming",
            photo_url="http://example.com/photo.jpg",
            event_url="http://example.com/id=1",
            description="A description of the meetup",
            group_name="Meetup Group",
            member_type="Member",
            time="2018-06-06 14:22:09Z",
            source="event source",
        )
        self.assertTrue(isinstance(event.to_json(), dict))

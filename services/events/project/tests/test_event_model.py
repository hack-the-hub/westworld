# services/events/project/tests/test_event_model.py

from sqlalchemy.orm.exc import FlushError

from project import db
from project.api.models import Event
from project.tests.base import BaseTestCase
from project.tests.utils import add_event


class TestEventModel(BaseTestCase):

    def test_add_event(self):
        event = add_event(
            id=1,
            name='Meetup name',
            created=1234123,
            status='upcoming',
            photo_url='http://example.com/photo.jpg',
            event_url='http://example.com/id=1',
            description='A description of the meetup'
        )

        self.assertEqual(event.id, 1)
        self.assertEqual(event.name, 'Meetup name')
        self.assertEqual(event.created, 1234123)
        self.assertEqual(event.status, 'upcoming')
        self.assertEqual(event.photo_url, 'http://example.com/photo.jpg')
        self.assertEqual(event.event_url, 'http://example.com/id=1')

    def test_add_event_duplicate_eventname(self):
        event = Event(
            id=1,
            name='Meetup name',
            created=1234123,
            status='upcoming',
            photo_url='http://example.com/photo.jpg',
            event_url='http://example.com/id=1',
            description='A description of the meetup'
        )
        duplicate_event = event

        db.session.add(event)
        db.session.commit()


        db.session.add(duplicate_event)

        self.assertRaises(FlushError, db.session.commit)

    def test_to_json(self):
        event = add_event(
            id=1,
            name='Meetup name',
            created=1234123,
            status='upcoming',
            photo_url='http://example.com/photo.jpg',
            event_url='http://example.com/id=1',
            description='A description of the meetup'
        )
        self.assertTrue(isinstance(event.to_json(), dict))

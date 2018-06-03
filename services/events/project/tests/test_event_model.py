from datetime import datetime
from datetime import timezone

from sqlalchemy.orm.exc import FlushError

from project import db
from project.api.models import Event
from project.tests.base import BaseTestCase
from project.tests.utils import add_event


class TestEventModel(BaseTestCase):

    def test_add_event(self):
        created = datetime.utcfromtimestamp(
            1525290524).replace(tzinfo=timezone.utc)
        time = datetime.utcfromtimestamp(
            1525290524).replace(tzinfo=timezone.utc)

        event = add_event(
            id='250383898',
            name='Meetup name',
            created=created,
            status='upcoming',
            photo_url='http://example.com/photo.jpg',
            event_url='http://example.com/id=1',
            description='A description of the meetup',
            group_name='Meetup Group',
            member_type='Member',
            time=time
        )

        self.assertEqual(event.id, '250383898')
        self.assertEqual(event.name, 'Meetup name')
        self.assertEqual(event.created, datetime(2018, 5, 2, 19, 48, 44))
        self.assertEqual(event.status, 'upcoming')
        self.assertEqual(event.photo_url, 'http://example.com/photo.jpg')
        self.assertEqual(event.event_url, 'http://example.com/id=1')
        self.assertEqual(event.group_name, 'Meetup Group')
        self.assertEqual(event.member_type, 'Member')
        self.assertEqual(event.time, datetime(2018, 5, 2, 19, 48, 44))

    def test_to_json(self):
        created = datetime.utcfromtimestamp(
            1525290524).replace(tzinfo=timezone.utc)
        time = datetime.utcfromtimestamp(
            1525290524).replace(tzinfo=timezone.utc)
        event = add_event(
            id='1',
            name='Meetup name',
            created=created,
            status='upcoming',
            photo_url='http://example.com/photo.jpg',
            event_url='http://example.com/id=1',
            description='A description of the meetup',
            group_name='Meetup Group',
            member_type='Member',
            time=time
        )
        self.assertTrue(isinstance(event.to_json(), dict))

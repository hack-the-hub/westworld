from datetime import datetime

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
            source="test",
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
        self.assertEqual(event.source, "test")

    def test_add_nisf_event(self):

        event = add_event(
            id="05672391d16b728ba9670f6788ef95f8783f15ceb97ac79334cdf771421a7a7b",
            name="Professor Brian Cox - Universal",
            created="2018-02-15 00:00:00Z",
            status="upcoming",
            photo_url="",
            event_url="http://www.nisciencefestival.com/event.php?e=8",
            description="missing desc",
            group_name="Space",
            member_type="public",
            time="2018-06-17 22:24:16Z",
            source="nisciencefestival",
        )

        self.assertEqual(
            event.id, "05672391d16b728ba9670f6788ef95f8783f15ceb97ac79334cdf771421a7a7b"
        )
        self.assertEqual(event.name, "Professor Brian Cox - Universal")
        self.assertEqual(event.created, datetime(2018, 2, 15, 00, 00, 00))
        self.assertEqual(event.status, "upcoming")
        self.assertEqual(event.photo_url, "")
        self.assertEqual(
            event.event_url, "http://www.nisciencefestival.com/event.php?e=8"
        )
        self.assertEqual(event.group_name, "Space")
        self.assertEqual(event.member_type, "public")
        self.assertEqual(event.time, datetime(2018, 6, 17, 22, 24, 16))
        self.assertEqual(event.source, "nisciencefestival")

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
            source="test",
        )
        self.assertTrue(isinstance(event.to_json(), dict))

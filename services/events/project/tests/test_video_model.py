from datetime import datetime

from project.tests.base import BaseTestCase
from project.tests.utils import add_video


class TestVideoModel(BaseTestCase):
    def test_add_video(self):
        video = add_video(
            id="cU-TGiWK-dc",
            name="Stone Age To Serverless or: How I Learned To Stop Worrying And Love The Platform",
            created="2018-05-05 14:30:00Z",
            url="https://www.youtube.com/watch?v=cU-TGiWK-dc",
            description="Due to a last-minute speaker dropout, Mark will be improvising on a theme",
            channel="Northern Ireland Developer Conference",
            source="youtube",
        )

        self.assertEqual(video.id, "cU-TGiWK-dc")
        self.assertEqual(
            video.name,
            "Stone Age To Serverless or: How I Learned To Stop Worrying And Love The Platform",
        )
        self.assertEqual(video.created, datetime(2018, 5, 5, 14, 30, 00))
        self.assertEqual(video.url, "https://www.youtube.com/watch?v=cU-TGiWK-dc")
        self.assertEqual(video.channel, "Northern Ireland Developer Conference")
        self.assertEqual(video.source, "youtube")

    def test_to_json(self):
        video = add_video(
            id="cU-TGiWK-dc",
            name="Stone Age To Serverless or: How I Learned To Stop Worrying And Love The Platform",
            created="2018-02-16 14:22:09Z",
            url="https://www.youtube.com/watch?v=cU-TGiWK-dc",
            description="Due to a last-minute speaker dropout, Mark will be improvising on a theme",
            channel="Northern Ireland Developer Conference",
            source="youtube",
        )
        self.assertTrue(isinstance(video.to_json(), dict))

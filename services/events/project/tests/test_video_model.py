from project.tests.base import BaseTestCase

from project.api.models import Topic
from project.api.models import Channel
from project.api.models import Video

from project import db


class TestVideoModel(BaseTestCase):
    def test_add_video(self):
        topic = Topic(name="Python", description="", abbreviation="py")
        channel = Channel(
            name="test", url="", description="", topics=[topic], source="test"
        )

        video = Video(
            name="Stone Age To Serverless or: How I Learned To Stop Worrying And Love The Platform",
            url="https://www.youtube.com/watch?v=cU-TGiWK-dc",
            description="Due to a last-minute speaker dropout, Mark will be improvising on a theme",
            topics=[topic],
            channel=[channel],
            source="youtube",
        )
        db.session.add(video)
        db.session.commit()

        self.assertEqual(
            video.name,
            "Stone Age To Serverless or: How I Learned To Stop Worrying And Love The Platform",
        )
        self.assertEqual(video.url, "https://www.youtube.com/watch?v=cU-TGiWK-dc")
        self.assertEqual(video.channel, [channel])
        self.assertEqual(video.source, "youtube")

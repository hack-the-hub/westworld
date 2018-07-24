from project.tests.base import BaseTestCase

from project.api.models import Topic
from project.api.models import Diversity
from project.api.models import Speaker

from project import db


class TestSpeakerModel(BaseTestCase):
    def test_add_speaker(self):
        topic = Topic(name="Python", description="", abbreviation="py")
        diversification = Diversity(name="speaker", description="description")

        speaker = Speaker(
            name="Kyle Harrison",
            avatar="https://avatar.com",
            bio="description",
            contact="apoclyps",
            role="Software Engineer",
            topics=[topic],
            diversification=[diversification],
            location="Belfast",
            source="test",
        )
        db.session.add(speaker)
        db.session.commit()

        self.assertEqual(speaker.name, "Kyle Harrison")
        self.assertEqual(speaker.avatar, "https://avatar.com")
        self.assertEqual(speaker.bio, "description")
        self.assertEqual(speaker.contact, "apoclyps")
        self.assertEqual(speaker.role, "Software Engineer")
        self.assertEqual(speaker.topics, [topic])
        self.assertEqual(speaker.diversification, [diversification])
        self.assertEqual(speaker.location, "Belfast")
        self.assertEqual(speaker.source, "test")

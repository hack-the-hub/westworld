from project.tests.base import BaseTestCase
from project.tests.utils import add_speaker

from project.api.models import Topic
from project.api.models import Diversity


class TestSpeakerModel(BaseTestCase):
    def test_add_speaker(self):
        topic = Topic(name="Python", description="", abbreviation="py")
        diversification = Diversity(name="speaker", description="description")

        speaker = add_speaker(
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

        self.assertEqual(speaker.name, "Kyle Harrison")
        self.assertEqual(speaker.avatar, "https://avatar.com")
        self.assertEqual(speaker.bio, "description")
        self.assertEqual(speaker.contact, "apoclyps")
        self.assertEqual(speaker.role, "Software Engineer")
        self.assertEqual(speaker.topics, [topic])
        self.assertEqual(speaker.diversification, [diversification])
        self.assertEqual(speaker.location, "Belfast")
        self.assertEqual(speaker.source, "test")

    def test_to_json(self):
        topic = Topic(name="Python", description="", abbreviation="py")
        diversification = Diversity(name="speaker", description="description")

        speaker = add_speaker(
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
        self.assertTrue(isinstance(speaker.to_json(), dict))

from project.tests.base import BaseTestCase
from project.tests.utils import add_speaker


class TestSpeakerModel(BaseTestCase):
    def test_add_speaker(self):
        speaker = add_speaker(
            name="Kyle Harrison",
            contact="apoclyps",
            image="https://pbs.twimg.com/profile_images/591351050776502272/H6s459Ko_400x400.jpg",
            role="Software Engineer",
            topics=["Python", "Backend Technologies", "Flask", "AWS"],
            diversification=["parenting"],
            location="Belfast",
            source="custom",
        )

        self.assertEqual(speaker.name, "Kyle Harrison")
        self.assertEqual(speaker.contact, "apoclyps")
        self.assertEqual(
            speaker.image,
            "https://pbs.twimg.com/profile_images/591351050776502272/H6s459Ko_400x400.jpg",
        )
        self.assertEqual(speaker.role, "Software Engineer")
        self.assertEqual(
            speaker.topics, ["Python", "Backend Technologies", "Flask", "AWS"]
        )
        self.assertEqual(speaker.diversification, ["parenting"])
        self.assertEqual(speaker.location, "Belfast")
        self.assertEqual(speaker.source, "custom")

    def test_to_json(self):
        speaker = add_speaker(
            name="Kyle Harrison",
            contact="apoclyps",
            image="https://pbs.twimg.com/profile_images/591351050776502272/H6s459Ko_400x400.jpg",
            role="Software Engineer",
            topics=["Python", "Backend Technologies", "Flask", "AWS"],
            diversification=["parenting"],
            location="Belfast",
            source="custom",
        )
        self.assertTrue(isinstance(speaker.to_json(), dict))

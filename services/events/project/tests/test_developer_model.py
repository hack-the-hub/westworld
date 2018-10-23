from project.tests.base import BaseTestCase

from project.api.models import Topic
from project.api.models import Developer

from project import db


class TestDeveloperModel(BaseTestCase):
    def test_add_developer(self):
        topic = Topic(name="Python", description="", abbreviation="py")

        developer = Developer(
            avatar="https://avatars1.githubusercontent.com/u/1443700?s=400&v=4",
            login="apoclyps",
            name="Kyle Harrison",
            gists=2,
            repositories=36,
            url="https://api.github.com/users/apoclyps",
            followers=15,
            company="@Muxer",
            blog="http://kyleharrison.co.uk",
            bio="Maker, Mentor, Geeky Dad",
            topics=[topic],
            location="Belfast",
            source="test",
        )
        db.session.add(developer)
        db.session.commit()

        self.assertEqual(developer.name, "Kyle Harrison")
        self.assertEqual(
            developer.avatar,
            "https://avatars1.githubusercontent.com/u/1443700?s=400&v=4",
        )
        self.assertEqual(developer.login, "apoclyps")
        self.assertEqual(developer.gists, 2)
        self.assertEqual(developer.repositories, 36)
        self.assertEqual(developer.followers, 15)
        self.assertEqual(developer.company, "@Muxer")
        self.assertEqual(developer.blog, "http://kyleharrison.co.uk")
        self.assertEqual(developer.url, "https://api.github.com/users/apoclyps")
        self.assertEqual(developer.bio, "Maker, Mentor, Geeky Dad")
        self.assertEqual(developer.topics, [topic])
        self.assertEqual(developer.location, "Belfast")
        self.assertEqual(developer.source, "test")

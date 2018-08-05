from datetime import datetime
from datetime import timezone

import unittest
import coverage

from flask_script import Manager
from flask_migrate import MigrateCommand

from project import create_app, db
from project.api.models import Event
from project.api.models import Video

COV = coverage.coverage(
    branch=True,
    include="project/*",
    omit=[
        "project/tests/*",
        "project/server/config.py",
        "project/server/*/__init__.py",
    ],
)
COV.start()


app = create_app()
manager = Manager(app)
manager.add_command("db", MigrateCommand)


@manager.command
def test():
    """Runs the unit tests without test coverage."""
    tests = unittest.TestLoader().discover("project/tests", pattern="test*.py")
    result = unittest.TextTestRunner(verbosity=2).run(tests)
    if result.wasSuccessful():
        return 0
    return 1


@manager.command
def cov():
    """Runs the unit tests with coverage."""
    tests = unittest.TestLoader().discover("project/tests")
    result = unittest.TextTestRunner(verbosity=2).run(tests)
    if result.wasSuccessful():
        COV.stop()
        COV.save()
        print("Coverage Summary:")
        COV.report()
        COV.html_report()
        COV.erase()
        return 0
    return 1


@manager.command
def recreate_db():
    """Recreates a database."""
    db.drop_all()
    db.create_all()
    db.session.commit()

@manager.command
def drop_db():
    """Recreates a database."""
    db.drop_all()
    db.session.commit()

@manager.command
def create_db():
    """creates a database."""
    db.create_all()
    db.session.commit()


@manager.command
def seed_db():
    """Seeds the database."""
    event_date = datetime(2019, 5, 2).timestamp()
    created = datetime.utcfromtimestamp(event_date).replace(tzinfo=timezone.utc)
    time = datetime.utcfromtimestamp(event_date).replace(tzinfo=timezone.utc)

    db.session.add(
        Topic(name="Python", description="", abbreviation="py"),
        Entry(type="ticket", description="description"),
        Channel(
            name="test", url="", description="test", topics=[topic], source="test"
        ),
    )
    db.session.add(
        Event(
            name="learning new technologies",
            description="example description",
            url="https://example.com",
            start="2018-06-06 16:15:00Z",
            end="2018-06-06 17:15:00Z",
            channel=[channel],
            duration=100000,
            topics=[topic],
            entry=[entry],
            source="test",
        )
    )
    db.session.add(
        Video(
            id="cU-TGiWK-dc",
            name="Stone Age To Serverless or: How I Learned To Stop Worrying And Love The Platform",
            created="2018-05-05 14:30:00Z",
            url="https://www.youtube.com/watch?v=cU-TGiWK-dc",
            description="Due to a last-minute speaker dropout, Mark will be improvising on a theme",
            channel="Northern Ireland Developer Conference",
            source="youtube",
        )
    )
    db.session.commit()


@manager.shell
def make_shell_context():
    """Returns a dictionary of variables to be injected into new shell sessions
    """
    return {
        "app": app,
    }


@manager.command
def run():
    """Run the application locally in the debug server
    """
    app.run(port=6000)


if __name__ == "__main__":
    manager.run()

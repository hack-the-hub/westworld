from datetime import datetime
from datetime import timezone

import unittest
import coverage

from flask_script import Manager
from flask_migrate import MigrateCommand

from project import create_app, db
from project.api.models import Event


COV = coverage.coverage(
    branch=True,
    include='project/*',
    omit=[
        'project/tests/*',
        'project/server/config.py',
        'project/server/*/__init__.py'
    ]
)
COV.start()


app = create_app()
manager = Manager(app)
manager.add_command('db', MigrateCommand)


@manager.command
def test():
    """Runs the unit tests without test coverage."""
    tests = unittest.TestLoader().discover('project/tests', pattern='test*.py')
    result = unittest.TextTestRunner(verbosity=2).run(tests)
    if result.wasSuccessful():
        return 0
    return 1


@manager.command
def cov():
    """Runs the unit tests with coverage."""
    tests = unittest.TestLoader().discover('project/tests')
    result = unittest.TextTestRunner(verbosity=2).run(tests)
    if result.wasSuccessful():
        COV.stop()
        COV.save()
        print('Coverage Summary:')
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
def seed_db():
    """Seeds the database."""
    created = datetime.utcfromtimestamp(
        1525290524).replace(tzinfo=timezone.utc)

    time = datetime.utcfromtimestamp(
        1525290524).replace(tzinfo=timezone.utc)

    db.session.add(Event(
        id=1,
        name='Meetup name',
        created=created,
        status='upcoming',
        photo_url='http://example.com/photo.jpg',
        event_url='http://example.com/id=1',
        description='A description of the meetup',
        group_name='Meetup Group',
        member_type='Member',
        time=time,
        source='test'
    ))
    db.session.commit()

@manager.command
def run():
    """Run the application locally in the debug server
    """
    app.run(port=6000)

if __name__ == '__main__':
    manager.run()

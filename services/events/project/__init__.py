import os

from flask import Flask
from flask_caching import Cache
from flask_compress import Compress
from flask_cors import CORS
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy

# instantiate the extensions
db = SQLAlchemy()
migrate = Migrate()
cache = Cache(config={"CACHE_TYPE": "simple"})
compress = Compress()


def create_app():

    # instantiate the app
    app = Flask(__name__)

    # enable CORS
    CORS(app)

    # set config
    app_settings = os.getenv("APP_SETTINGS")
    app.config.from_object(app_settings)

    # set up extensions
    db.init_app(app)
    migrate.init_app(app, db)
    cache.init_app(app)
    compress.init_app(app)

    # register blueprints
    from project.api.events import events_blueprint
    from project.api.videos import videos_blueprint
    from project.api.speakers import speakers_blueprint
    from project.api.developers import developers_blueprint
    from project.api.calendar import calendar_blueprint

    app.register_blueprint(events_blueprint)
    app.register_blueprint(videos_blueprint)
    app.register_blueprint(speakers_blueprint)
    app.register_blueprint(developers_blueprint)
    app.register_blueprint(calendar_blueprint)

    # shell context for flask cli
    @app.shell_context_processor
    def ctx():
        return {"app": app, "db": db}

    return app

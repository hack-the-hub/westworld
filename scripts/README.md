Populating the Service
======================

The following scripts ingest from 3rd party sites, transform the data, and send it to the events API service.

### Prerequisites

You need to have python 3.6.6, and pipenv installed to run each script; the following commands will allow you to check both your python and pipenv version.

```
$ python -v
$ pipenv
```

You will also need to create API keys for Meetup.com and Eventbrite. These can be exported as environmental variable in your session using `export VARIABLE_NAME=VALUE` or can be added to a `.env` file.

```
MEETUP_API_TOKEN=
EVENTBRITE_API_TOKEN=
DEVELOPER_KEY=
GITHUB_TOKEN=
LOCATION=
```

You can request an API key for both services using the following links:

-	[Meetup](https://secure.meetup.com/meetup_api/key/)
-	[Eventbrite](https://www.eventbrite.co.uk/support/articles/en_US/How_To/how-to-locate-your-eventbrite-api-user-key?lg=en_GB)
-	Northern Ireland Science Festival does not require an API key

Lastly, you will need to provide the endpoint which will update your local service.

```
EVENTS_ENDPOINT=http://localhost/events
VIDEOS_ENDPOINT=http://localhost/videos
SPEAKERS_ENDPOINT=http://localhost/speakers
DEVELOPERS_ENDPOINT=http://localhost/developers
```

Ensure all database migrations have been applied to a running database, and that the optional seed_db command has been run for the users service. If you request data from http:localhost/events and do not see a Flask error page, then you are good to proceed.

### Installing

Before running the scripts you will need to install the dependencies via the Pipfile; please allow 1-2 minutes for this to complete on slower connections.

```sh
pipenv install
```

### Running the scripts

Run the following command and you're database should get populated.

```sh
$ pipenv run python src/meetup_events.py
```

View http://localhost and you should now see a list of events

### Loading data form all sources

To load data from all sources, you can run the following shell scripts with an environment flag

`./test.sh dev`

#!/bin/bash

env=$1
file=""

if [[ "${env}" == "dev" ]]; then
  file="dev"
  export EVENTS_ENDPOINT=http://localhost/events
  export VIDEOS_ENDPOINT=http://localhost/videos
  export SPEAKERS_ENDPOINT=http://localhost/speakers
elif [[ "${env}" == "stage" ]]; then
  file="staging"
  export EVENTS_ENDPOINT=http://my-dev-space-staging-alb-2128504978.us-east-1.elb.amazonaws.com/events
  export VIDEOS_ENDPOINT=http://my-dev-space-staging-alb-2128504978.us-east-1.elb.amazonaws.com/videos
  export SPEAKERS_ENDPOINT=http://my-dev-space-staging-alb-2128504978.us-east-1.elb.amazonaws.com/speakers
elif [[ "${env}" == "prod" ]]; then
  file="production"
else
  echo "USAGE: sh load_data.sh environment_name"
  echo "* environment_name: must either be 'dev', 'stage', or 'prod'"
  exit 1
fi

echo "Start loading ${env}"
pipenv run python src/eventbrite_events.py
pipenv run python src/meetup_events.py
pipenv run python src/northern_ireland_science_festival_events.py
pipenv run python src/youtube_videos.py
pipenv run python src/speakers.py
echo "Completed loading ${env}"

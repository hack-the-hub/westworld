#!/bin/bash
env=$1
file=""

load_events()
{
  echo "Loading eventbrite events"
  pipenv run python src/eventbrite_events.py
  echo "Loading meetup events"
  pipenv run python src/meetup_events.py
  echo "Loading NISF events"
  pipenv run python src/northern_ireland_science_festival_events.py
  echo "Loading Farset Lab events"
  pipenv run python src/farset_events.py
}

load_videos()
{
  echo "Loading Youtube videos"
  pipenv run python src/youtube_videos.py
}

load_speakers()
{
  echo "Loading Speakers"
  pipenv run python src/speakers.py
}

if [[ "${env}" == "dev" ]]; then
  export EVENTS_ENDPOINT=http://localhost/events
  export VIDEOS_ENDPOINT=http://localhost/videos
  export SPEAKERS_ENDPOINT=http://localhost/speakers
elif [[ "${env}" == "stage" ]]; then
  export EVENTS_ENDPOINT=http://my-dev-space-staging-alb-2128504978.us-east-1.elb.amazonaws.com/events
  export VIDEOS_ENDPOINT=http://my-dev-space-staging-alb-2128504978.us-east-1.elb.amazonaws.com/videos
  export SPEAKERS_ENDPOINT=http://my-dev-space-staging-alb-2128504978.us-east-1.elb.amazonaws.com/speakers
elif [[ "${env}" == "prod" ]]; then
  export EVENTS_ENDPOINT=https://muxer.co.uk/events
  export VIDEOS_ENDPOINT=https://muxer.co.uk/videos
  export SPEAKERS_ENDPOINT=https://muxer.co.uk/speakers
else
  echo "USAGE: sh load_data.sh environment_name"
  echo "* environment_name: must either be 'dev', 'stage', or 'prod'"
  exit 1
fi

echo "Start loading ${env}"
load_events
load_videos
load_speakers
echo "Completed loading ${env}"

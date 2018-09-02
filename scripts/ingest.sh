#!/bin/sh

if [ "$TRAVIS_BRANCH" == "ingest" ]
then
  set -x

  echo "Running staging ingest"
  bash ./load_data.sh stage
  echo "Completed staging ingest"

  echo "Running production ingest"
  bash ./load_data.sh prod
  echo "Completed production ingest"

  set +x
fi

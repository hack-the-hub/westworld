#!/bin/bash

env=$1
file=""
fails=""

if [[ "${env}" == "dev" ]]; then
  file="docker-compose-dev.yml"
elif [[ "${env}" == "stage" ]]; then
  file="docker-compose-stage.yml"
elif [[ "${env}" == "prod" ]]; then
  file="docker-compose-prod.yml"
else
  echo "USAGE: sh test.sh environment_name"
  echo "* environment_name: must either be 'dev', 'stage', or 'prod'"
  exit 1
fi

inspect() {
  if [ $1 -ne 0 ]; then
    fails="${fails} $2"
  fi
}

set -x

# allows time for the docker containers to come up prior to running tests
if [[ "${env}" != "dev" ]]; then
  sleep 15
fi

# Users service
docker-compose -f $file run users-service py.test --black --pep8 --flakes -vv --mccabe --cov=project --cov-report=term-missing --junitxml=test-results/results.xml
inspect $? users-test

# Events service
docker-compose -f $file run events-service py.test --black --pep8 --flakes -vv --mccabe --cov=project --cov-report=term-missing --junitxml=test-results/results.xml
inspect $? events-test

# Client
docker-compose -f $file build client-test
docker-compose -f $file run client-test npm run lint
inspect $? client-lint
CI=true docker-compose -f $file run client-test npm test -- --coverage
inspect $? client-test

# Lambdas
docker-compose -f $file build lambdas-test
docker-compose -f $file run lambdas-test npm run lint
inspect $? lambdas-lint

# Integration tests
if [[ "${env}" != "stage" ]]; then
  testcafe chrome e2e
  inspect $? e2e
else
  testcafe chrome e2e/index.test.js
  inspect $? e2e
fi

set +x

if [ -n "${fails}" ]; then
  echo "Tests failed: ${fails}"
  exit 1
else
  echo "Tests passed!"
  exit 0
fi

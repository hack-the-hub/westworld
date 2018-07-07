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

docker-compose -f $file run users-service python manage.py test
inspect $? users
docker-compose -f $file run users-service py.test --black --pep8 --flakes -vv --mccabe --cov=project --cov-report=term-missing --junitxml=test-results/results.xml
docker-compose -f $file run events-service py.test --black --pep8 --flakes -vv --mccabe --cov=project --cov-report=term-missing --junitxml=test-results/results.xml
inspect $? users-lint

docker-compose -f $file build client-test
docker-compose -f $file run client-test npm run lint
inspect $? client-lint
CI=true docker-compose -f $file run client-test npm test -- --coverage
inspect $? client-test

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

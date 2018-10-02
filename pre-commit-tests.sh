inspect() {
  if [ $1 -ne 0 ]; then
    fails="${fails} $2"
  fi
}

docker-compose -f docker-compose-dev.yml run users-service py.test --black --pep8 --flakes -vv --mccabe --cov=project --cov-report=term-missing --junitxml=test-results/results.xml
inspect $? users-test
docker-compose -f docker-compose-dev.yml run events-service py.test --black --pep8 --flakes -vv --mccabe --cov=project --cov-report=term-missing --junitxml=test-results/results.xml
inspect $? events-test

docker-compose -f docker-compose-dev.yml build client-test
docker-compose -f docker-compose-dev.yml run client-test npm run lint
inspect $? client-lint
CI=true docker-compose -f docker-compose-dev.yml run client-test npm test -- --coverage
inspect $? client-test

if [ -n "${fails}" ]; then
  echo "Tests failed: ${fails}"
  exit 1
else
  echo "Tests passed!"
  exit 0
fi
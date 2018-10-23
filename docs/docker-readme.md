### Setting up a local development environment

The following steps will check out the repository, install the dependencies needed for the React frontend and run the service on `http://localhost`.

```bash
$ git clone https://github.com/apoclyps/my-dev-space
$ cd my-dev-space
$ docker-compose -f docker-compose-dev.yml up -d
```

Once the service is up and running, you will need to manually create the required tables in the database and install the optional seed data to complete the local Postgres setup.

```bash
$ docker-compose -f docker-compose-dev.yml run users-service python manage.py recreate_db
$ docker-compose -f docker-compose-dev.yml run users-service python manage.py seed_db
$ docker-compose -f docker-compose-dev.yml run events-service python manage.py recreate_db
```

On subsequent runs (when the above steps have been completed), you can apply new database migrations to your local service by running:

```bash
$ docker-compose -f docker-compose-dev.yml run users-service python manage.py db upgrade
$ docker-compose -f docker-compose-dev.yml run events-service python manage.py db upgrade
```

Alternatively, if you make a change to a model during development, you will need to create and commit a migration file for that service. As a best practice, migration files should be committed independently to code:

```bash
$ docker-compose -f docker-compose-dev.yml run users-service python manage.py db migrate
$ docker-compose -f docker-compose-dev.yml run events-service python manage.py db migrate
```

## Running the tests

The following will run the unit tests for each respective service:

###### `client`
```bash
$ docker-compose -f docker-compose-dev.yml run client-test npm test
```

###### `users-service`
```bash
$ docker-compose -f docker-compose-dev.yml run users-service python manage.py test
```

###### `events-service`
```bash
$ docker-compose -f docker-compose-dev.yml run events-service python manage.py test
```

### Running linting

###### `client`
```bash
$ docker-compose -f docker-compose-dev.yml run client npm run lint
```

###### `users-service`
```bash
$ docker-compose -f docker-compose-dev.yml run user-service py.test --black --pep8 --flakes -vv --mccabe --cov=project --cov-report=term-missing --junitxml=test-results/results.xml
```

###### `events-service`
```bash
$ docker-compose -f docker-compose-dev.yml run events-service py.test --black --pep8 --flakes -vv --mccabe --cov=project --cov-report=term-missing --junitxml=test-results/results.xml
```

### Running code coverage
```bash
$ docker-compose -f docker-compose-dev.yml run users-service python manage.py cov
```

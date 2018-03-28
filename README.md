# My Dev Space Service

[![Build Status](https://travis-ci.com/apoclyps/my-dev-space.svg?token=putHnyd9Fyt2bwsGacCD&branch=master)](https://travis-ci.com/apoclyps/my-dev-space?token=putHnyd9Fyt2bwsGacCD&branch=master)

### Build Commands

Build the images:

```bash
docker-compose build
```

Run the containers:

```bash
docker-compose up -d
```

Create the database:

```bash
docker-compose run users-service python manage.py recreate_db
```

Seed the database:

```bash
docker-compose run users-service python manage.py seed_db
```

Run the tests:

```bash
docker-compose run users-service python manage.py test
```

```bash
docker-compose run users-service python manage.py cov
```

```bash
docker-compose run users-service flake8 project
```

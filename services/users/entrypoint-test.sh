#!/bin/sh

echo "Waiting for postgres..."

while ! nc -z users-db 5432; do
  sleep 0.1
done

echo "PostgreSQL started"

# setup database
python manage.py recreate_db
python manage.py db migrate
python manage.py seed_db

newrelic-admin run-program gunicorn -b 0.0.0.0:5000 manage:app

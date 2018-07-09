#!/bin/sh

echo "Waiting for postgres..."

while ! nc -z events-db 5432; do
  sleep 0.1
done

echo "PostgreSQL started"

python manage.py recreate_db
python manage.py db upgrade
python manage.py seed_db

newrelic-admin run-program gunicorn -b 0.0.0.0:6000 manage:app

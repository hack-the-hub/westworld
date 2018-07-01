#!/bin/sh

echo "Waiting for postgres..."

while ! nc -z users-db 5432; do
  sleep 0.1
done

echo "PostgreSQL started"

newrelic-admin run-program python manage.py runserver -h 0.0.0.0

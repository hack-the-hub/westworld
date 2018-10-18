#!/usr/bin/make -f

.PHONY: env-start env-stop env-restart test-users-service test-events-service

PROJECT_NAME := 'my-dev-space'
DOCKER_COMPOSE_FILE := ./docker-compose-dev.yml

env-start:
	docker-compose -p $(PROJECT_NAME) -f $(DOCKER_COMPOSE_FILE) up -d

env-build:
	docker-compose -p $(PROJECT_NAME) -f $(DOCKER_COMPOSE_FILE) build --no-cache --pull

env-stop:
	docker-compose -p $(PROJECT_NAME) -f $(DOCKER_COMPOSE_FILE) down

env-restart:
	docker-compose -p $(PROJECT_NAME) -f $(DOCKER_COMPOSE_FILE) restart

env-destroy:
	docker-compose -p $(PROJECT_NAME) -f $(DOCKER_COMPOSE_FILE) down -v --rmi all --remove-orphans

migrate: migrate-users-service-db migrate-events-service-db

upgrade: upgrade-users-service-db upgrade-events-service-db

seed: recreate-users-service-db seed-db recreate-events-service-db

lint: lint-users-service-db lint-events-service-db


test-users-service:
	docker-compose -p $(PROJECT_NAME) -f $(DOCKER_COMPOSE_FILE) run users-service python manage.py test

recreate-users-service-db:
	docker-compose -p $(PROJECT_NAME) -f $(DOCKER_COMPOSE_FILE) run users-service python manage.py recreate_db

upgrade-users-service-db:
	docker-compose -p $(PROJECT_NAME) -f $(DOCKER_COMPOSE_FILE) run users-service python manage.py upgrade

migrate-users-service-db:
	docker-compose -p $(PROJECT_NAME) -f $(DOCKER_COMPOSE_FILE) run users-service python manage.py migrate

seed-db:
	docker-compose -p $(PROJECT_NAME) -f $(DOCKER_COMPOSE_FILE) run users-service python manage.py seed_db

lint-users-service-db:
	docker-compose -p $(PROJECT_NAME) -f $(DOCKER_COMPOSE_FILE) run users-service pytest --black --pep8 --flakes -vv --mccabe --cov=project --cov-report=term-missing --junitxml=test-results/results.xml


test-events-service:
	docker-compose -p $(PROJECT_NAME) -f $(DOCKER_COMPOSE_FILE) run events-service python manage.py test

recreate-events-service-db:
	docker-compose -p $(PROJECT_NAME) -f $(DOCKER_COMPOSE_FILE) run events-service python manage.py recreate_db

upgrade-events-service-db:
	docker-compose -p $(PROJECT_NAME) -f $(DOCKER_COMPOSE_FILE) run events-service python manage.py upgrade

migrate-events-service-db:
	docker-compose -p $(PROJECT_NAME) -f $(DOCKER_COMPOSE_FILE) run events-service python manage.py migrate

lint-events-service-db:
	docker-compose -p $(PROJECT_NAME) -f $(DOCKER_COMPOSE_FILE) run events-service pytest --black --pep8 --flakes -vv --mccabe --cov=project --cov-report=term-missing --junitxml=test-results/results.xml



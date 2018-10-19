#!/usr/bin/make -f

.PHONY: env-start env-stop env-restart env-build env-destroy
.PHONY: migrate upgrade seed lint
.PHONY: test-users recreate-users upgrade-users migrate-usersrvice
.PHONY: seed-users lint-users test-events recreate-events
.PHONY: upgrade-events migrate-events lint-events

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


migrate: migrate-users migrate-events

upgrade: upgrade-users upgrade-events

seed: recreate-users seed-users recreate-events

lint: lint-users lint-events

test: test-events test-users

coverage:
	docker-compose -p $(PROJECT_NAME) -f $(DOCKER_COMPOSE_FILE) run users-service python manage.py cov


test-users:
	docker-compose -p $(PROJECT_NAME) -f $(DOCKER_COMPOSE_FILE) run users-service python manage.py test

recreate-users:
	docker-compose -p $(PROJECT_NAME) -f $(DOCKER_COMPOSE_FILE) run users-service python manage.py recreate_db

upgrade-users:
	docker-compose -p $(PROJECT_NAME) -f $(DOCKER_COMPOSE_FILE) run users-service python manage.py upgrade

migrate-users:
	docker-compose -p $(PROJECT_NAME) -f $(DOCKER_COMPOSE_FILE) run users-service python manage.py migrate

seed-users:
	docker-compose -p $(PROJECT_NAME) -f $(DOCKER_COMPOSE_FILE) run users-service python manage.py seed_db

lint-users:
	docker-compose -p $(PROJECT_NAME) -f $(DOCKER_COMPOSE_FILE) run users-service pytest --black --pep8 --flakes -vv --mccabe --cov=project --cov-report=term-missing --junitxml=test-results/results.xml


test-events:
	docker-compose -p $(PROJECT_NAME) -f $(DOCKER_COMPOSE_FILE) run events-service python manage.py test

recreate-events:
	docker-compose -p $(PROJECT_NAME) -f $(DOCKER_COMPOSE_FILE) run events-service python manage.py recreate_db

upgrade-events:
	docker-compose -p $(PROJECT_NAME) -f $(DOCKER_COMPOSE_FILE) run events-service python manage.py upgrade

migrate-events:
	docker-compose -p $(PROJECT_NAME) -f $(DOCKER_COMPOSE_FILE) run events-service python manage.py migrate

lint-events:
	docker-compose -p $(PROJECT_NAME) -f $(DOCKER_COMPOSE_FILE) run events-service pytest --black --pep8 --flakes -vv --mccabe --cov=project --cov-report=term-missing --junitxml=test-results/results.xml


test-client:
	docker-compose -p $(PROJECT_NAME) -f $(DOCKER_COMPOSE_FILE) run users-service python manage.py seed_db

lint-client:
	docker-compose -p $(PROJECT_NAME) -f $(DOCKER_COMPOSE_FILE) run users-service python manage.py seed_db

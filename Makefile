#!/usr/bin/make -f

.PHONY: help start stop restart build destroy
.PHONY: migrate upgrade seed lint
.PHONY: test-users recreate-users upgrade-users migrate-user
.PHONY: seed-users lint-users test-events recreate-events
.PHONY: upgrade-events migrate-events lint-events

.DEFAULT_GOAL := help

PROJECT_NAME := 'my-dev-space'
DOCKER_COMPOSE_FILE := ./docker-compose-dev.yml

help:
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)


start: ## Install dependencies and start all services
	docker-compose -p $(PROJECT_NAME) -f $(DOCKER_COMPOSE_FILE) up -d

build: ## Pull and build all services
	docker-compose -p $(PROJECT_NAME) -f $(DOCKER_COMPOSE_FILE) build --no-cache --pull

stop: ## Bring down all services
	docker-compose -p $(PROJECT_NAME) -f $(DOCKER_COMPOSE_FILE) down

restart: ## Restart all services
	docker-compose -p $(PROJECT_NAME) -f $(DOCKER_COMPOSE_FILE) restart

destroy: ## Remove all services, images, and their volumes
	docker-compose -p $(PROJECT_NAME) -f $(DOCKER_COMPOSE_FILE) down -v --rmi all --remove-orphans


migrate: ## Run the latest migrations for the users and events service
	migrate-users migrate-events

upgrade: ## Run all migrations for the users and events service
	upgrade-users upgrade-events

seed: ### Creates the users and events database and seeds the user database
	recreate-users seed-users recreate-events

lint: ## Runs linting for the users and events services
	lint-users lint-events

test: ## Runs tests for the users and events services
	test-events test-users

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

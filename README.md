Muxer
=====

[![Build Status](https://travis-ci.com/apoclyps/my-dev-space.svg?token=putHnyd9Fyt2bwsGacCD&branch=production)](https://travis-ci.com/apoclyps/my-dev-space?token=putHnyd9Fyt2bwsGacCD&branch=production)[![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://github.com/Naereen/StrapDown.js/blob/master/LICENSE)[![All Contributors](https://img.shields.io/badge/all_contributors-9-orange.svg?style=flat-square)](#contributors)[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-green.svg)](http://makeapullrequest.com) ![Code of Conduct](https://img.shields.io/badge/%E2%88%9A-Code%20of%20Conduct-blue.svg)

> A open source developer community to promote local hackathons, conferences, and meetups, mentoring, calls for speakers, and collaboration.

Getting Started
---------------

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

-	[Docker](https://docs.docker.com/install/) - Used to build, ship, and run all services
-	[Python](https://maven.apache.org/) - Dependency Management
-	[Node](https://rometools.github.io/rome/) - Used to generate RSS Feeds
-	[Make](https://en.wikipedia.org/wiki/Make_(software)) - Used to shorten common docker-compose commands

### Setting up a local development environment

The following steps are required for first time setup. These steps will check out the repository, install the project dependencies, and the client dependencies needed for the React frontend and run the service on `http://localhost`. *Note* `http://localhost` will show a gateway error until the client has completed building (typically 1 minute for first time setup).

```bash
$ git clone https://github.com/apoclyps/my-dev-space
$ cd my-dev-space
$ npm install
$ cd services/client
$ npm install
$ cd ../../
$ make start
```

Alternatively, if `make` is unavailable on your operating system you can run docker-compose directly following this [README](docs/docker-readme.md)

Once the service is up and running, you will need to manually create the required tables in the database and install the optional seed data to complete the local Postgres setup.

```bash
$ make seed
```

On subsequent runs (when the above steps have been completed), you can apply new database migrations to your local service by running:

```bash
$ make upgrade
```

Alternatively, if you make a change to a model during development, you will need to create and commit a migration file for that service. As a best practice, migration files should be committed independently to code:

```bash
$ make migrate
```

To load data into the service for development, the recommended solution is to use the load script within the `scripts` folder to populate the local database. Details on how to configure the script can be found in [`scripts/README.md`](scripts/README.md)\.

```sh
`./load_data.sh dev`
```

And to tear down the local development stack, simply run:

```bash
$ make stop
```

If you wish to populate your local database with events from external services, you can use the steps outlined in the scripts [README](scripts/README.md).

### Running the tests

To run the entire application test suite, you can run:

```bash
$ make test
```

Alternatively, you can run tests for each respective service with:

```bash
$ make test-client
$ make test-users
$ make test-events
```

### Run linting

To lint the entire project, you can execute:

```bash
$ make lint
```

Alternatively, you can run linting for each respective service with:

```bash
$ make lint-client
$ make lint-users
$ make lint-events
```

### Running code coverage

```bash
$ make coverage
```

### Local Postgres Connections

```bash
docker-compose -f docker-compose-dev.yml run events-db sh

psql postgres://postgres:postgres@events-db:5432/events_dev
```

### Debugging Python Applications

##### End to End tests

Integration tests used to evaluate all services behave correctly

```bash
$ npm install testcafe -g
$ export TEST_URL='http://localhost'
$ testcafe chrome e2e
```

### Deployment

Deployments to the staging and production environments require a PR to be opened against the staging/production branches; Upon successfully merging a PR into either branch; Travis CI will build, run, test, and deploy the changes to AWS ECS.

### Built With

-	[React](http://www.dropwizard.io/1.0.2/docs/) - Javascript client framework
-	[Flask](https://maven.apache.org/) - Python web framework
-	[Postgres](https://www.postgresql.org/) - Relational Database Management System
-	[Docker](https://rometools.github.io/rome/) - Build, run, and deploy services
-	[Swagger](https://swagger.io/) - Generate API documentation
-	[Nginx](https://www.nginx.com/) - high-performance HTTP server, reverse proxy

### Contributors

A list of contributors who participated in this project.

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars0.githubusercontent.com/u/1443700?v=4" width="100px;"/><br /><sub><b>Kyle Harrison</b></sub>](http://www.kyleharrison.co.uk)<br />[💻](https://github.com/apoclyps/my-dev-space/commits?author=apoclyps "Code") [📖](https://github.com/apoclyps/my-dev-space/commits?author=apoclyps "Documentation") | [<img src="https://avatars0.githubusercontent.com/u/6596210?v=4" width="100px;"/><br /><sub><b>Adam Smith</b></sub>](https://github.com/FatalEnigma)<br />[💻](https://github.com/apoclyps/my-dev-space/commits?author=FatalEnigma "Code") | [<img src="https://avatars2.githubusercontent.com/u/17544636?v=4" width="100px;"/><br /><sub><b>Ewa G </b></sub>](https://github.com/TheMicroGirl)<br />[💻](https://github.com/apoclyps/my-dev-space/commits?author=TheMicroGirl "Code") | [<img src="https://avatars2.githubusercontent.com/u/16101792?v=4" width="100px;"/><br /><sub><b>Michael Grundie</b></sub>](https://www.linkedin.com/in/michaelgrundie)<br />[💻](https://github.com/apoclyps/my-dev-space/commits?author=MichaelGrundie "Code") | [<img src="https://avatars1.githubusercontent.com/u/9554484?v=4" width="100px;"/><br /><sub><b>DermotMcAteer</b></sub>](https://github.com/DermotMcAteer)<br />[💻](https://github.com/apoclyps/my-dev-space/commits?author=DermotMcAteer "Code") | [<img src="https://avatars2.githubusercontent.com/u/28186624?v=4" width="100px;"/><br /><sub><b>kimmoylan</b></sub>](https://github.com/kimmoylan)<br />[💻](https://github.com/apoclyps/my-dev-space/commits?author=kimmoylan "Code") | [<img src="https://avatars2.githubusercontent.com/u/2376829?v=4" width="100px;"/><br /><sub><b>Peter Stevenson</b></sub>](https://github.com/GoldenCrow)<br />[💻](https://github.com/apoclyps/my-dev-space/commits?author=GoldenCrow "Code") |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| [<img src="https://avatars2.githubusercontent.com/u/635903?v=4" width="100px;"/><br /><sub><b>Alistair Brown</b></sub>](http://alistairjcbrown.com)<br />[💻](https://github.com/apoclyps/my-dev-space/commits?author=alistairjcbrown "Code") | [<img src="https://avatars0.githubusercontent.com/u/32307798?v=4" width="100px;"/><br /><sub><b>gingerzoealex</b></sub>](https://github.com/gingerzoealex)<br />[💻](https://github.com/apoclyps/my-dev-space/commits?author=gingerzoealex "Code") [🎨](#design-gingerzoealex "Design") |
<!-- ALL-CONTRIBUTORS-LIST:END -->

### License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

### Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

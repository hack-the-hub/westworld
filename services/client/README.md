# My Dev Space

> The front end service for My Dev Space, an open source developer community to promote local hackathons, conferences, and meetups, mentoring, calls for speakers, and collaboration.

## Getting Started:

Before you can can work on this serrvice, you will need to ensure that you have the most [Docker](https://www.docker.com/) installed on your machine.

#### 1. Install Dependencies

``` bash
$ docker-compose -f docker-compose-dev.yml run client npm install
```


#### 2. Start the Dev Server

``` bash
$ docker-compose -f docker-compose-dev.yml run client npm start
```


#### 3.) Build the app

``` bash
$ docker-compose -f docker-compose-dev.yml run client npm run build
```

#### 4.) Run tests

``` bash
$ docker-compose -f docker-compose-dev.yml run client npm run test
```


#### 5.) Lint code

``` bash
$ docker-compose -f docker-compose-dev.yml run client npm run lint
```

## Project Structure
The majority of code for this project is located in the `src` folder. From there, the `pages` folder containes React components which are responsible for rendering out full pages. The `components` folder contains more React components, these are consumed by the Page components. The `reducers`, `selectors` and `store` directories contain code responsible for state management. This app relies on [Redux](https://redux.js.org/) for state management. Finally, the `utils` directory contains usefult helper functions.

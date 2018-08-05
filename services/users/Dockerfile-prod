FROM python:3.7.0

# install environment dependencies
RUN apt-get update -yqq && apt-get install -yqq --no-install-recommends netcat && apt-get -q clean

# set working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# add requirements
RUN pip install --no-cache-dir pipenv
COPY Pipfile Pipfile.lock /usr/src/app/
RUN pipenv install --deploy --dev --ignore-pipfile --system

# add newrelic config
ADD ./newrelic.ini /usr/src/app/newrelic.ini
ENV NEW_RELIC_CONFIG_FILE=newrelic.ini

# add app
ADD . /usr/src/app

# run server
CMD newrelic-admin run-program gunicorn -b 0.0.0.0:5000 manage:app

#!/bin/sh

if [ -z "$TRAVIS_PULL_REQUEST" ] || [ "$TRAVIS_PULL_REQUEST" == "false" ]
then
  if [ "$TRAVIS_BRANCH" == "staging" ] || \
    [ "$TRAVIS_BRANCH" == "production" ]
  then
    curl "https://s3.amazonaws.com/aws-cli/awscli-bundle.zip" -o "awscli-bundle.zip"

    unzip awscli-bundle.zip
    ./awscli-bundle/install -b ~/bin/aws
    export PATH=~/bin:$PATH
    eval $(aws ecr get-login --region us-east-1 --no-include-email)
    export TAG=$TRAVIS_BRANCH
    export REPO=$AWS_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com
  fi

  if [ "$TRAVIS_BRANCH" == "staging" ]
  then
    export REACT_APP_USERS_SERVICE_URL="http://testdriven-staging-alb-579190633.us-east-1.elb.amazonaws.com"
  fi

  if [ "$TRAVIS_BRANCH" == "production" ]
  then
    export REACT_APP_USERS_SERVICE_URL="http://testdriven-production-alb-453010484.us-east-1.elb.amazonaws.com"
    export DATABASE_URL="$AWS_RDS_URI"
    export SECRET_KEY="$PRODUCTION_SECRET_KEY"
  fi

  if [ "$TRAVIS_BRANCH" == "staging" ] || [ "$TRAVIS_BRANCH" == "production" ]
  then
    cd $USERS_DIR
    docker build -t $USERS:$COMMIT -f Dockerfile-$DOCKER_ENV .
    docker tag $USERS:$COMMIT $REPO/$USERS:$TAG
    docker push $REPO/$USERS:$TAG
    cd ../../

    cd $USERS_DB_DIR
    docker build -t $USERS_DB:$COMMIT -f Dockerfile .
    docker tag $USERS_DB:$COMMIT $REPO/$USERS_DB:$TAG
    docker push $REPO/$USERS_DB:$TAG
    cd ../../../../

    cd $CLIENT_DIR
    docker build -t $CLIENT:$COMMIT -f Dockerfile-$DOCKER_ENV --build-arg REACT_APP_USERS_SERVICE_URL=$REACT_APP_USERS_SERVICE_URL .
    docker tag $CLIENT:$COMMIT $REPO/$CLIENT:$TAG
    docker push $REPO/$CLIENT:$TAG
    cd ../../

    cd $SWAGGER_DIR
    docker build -t $SWAGGER:$COMMIT -f Dockerfile-$DOCKER_ENV .
    docker tag $SWAGGER:$COMMIT $REPO/$SWAGGER:$TAG
    docker push $REPO/$SWAGGER:$TAG
    cd ../../
  fi
fi

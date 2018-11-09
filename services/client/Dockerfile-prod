FROM node:latest as builder

# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# add environment variables
ARG REACT_APP_USERS_SERVICE_URL
ARG REACT_APP_EVENTS_SERVICE_URL
ARG REACT_APP_GOOGLE_ANALYTICS_ID
ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
ENV REACT_APP_USERS_SERVICE_URL $REACT_APP_USERS_SERVICE_URL
ENV REACT_APP_EVENTS_SERVICE_URL $REACT_APP_EVENTS_SERVICE_URL
ENV REACT_APP_GOOGLE_ANALYTICS_ID $REACT_APP_GOOGLE_ANALYTICS_ID

# install and cache app dependencies
COPY package.json package-lock.json /usr/src/app/
RUN cd /usr/src/app && npm install --silent
RUN npm install --only=dev --silent

# add app
COPY . /usr/src/app

# build react app
RUN npm run build

FROM nginx:1.15.6-alpine
RUN rm -rf /etc/conf.d
COPY conf /etc/nginx
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]

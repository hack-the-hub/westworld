FROM postgres:9.6

RUN apt-get update && apt-get install -y postgresql-contrib-9.6

ADD create.sql /docker-entrypoint-initdb.d
ADD extensions.sh /docker-entrypoint-initdb.d/

RUN chmod 755 /docker-entrypoint-initdb.d/extensions.sh

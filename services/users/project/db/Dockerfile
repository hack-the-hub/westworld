FROM postgres:9.6-alpine

COPY create.sql /docker-entrypoint-initdb.d
COPY extensions.sh /docker-entrypoint-initdb.d/

RUN chmod 755 /docker-entrypoint-initdb.d/extensions.sh

FROM mysql:latest

ENV MYSQL_DATABASE=uklon \
    MYSQL_ROOT_PASSWORD=${password}
COPY ./ /docker-entrypoint-initdb.d/

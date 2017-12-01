#!/bin/bash

echo "Creating POSTGRES env variables";
export DATABASE_USER=postgres \
export DATABASE_PASSWORD=secret \
export DATABASE_HOST=localhost \
export DATABASE_PORT=5432 \
export DATABASE_DB=demo

function install_dependencies {

    echo "Installing npm dependencies";
    npm install

    echo "Pulling POSTGRES docker image";
    docker pull postgres

}

function run_db {

    containerId=$(docker ps -a -q --filter ancestor=postgres)

    echo "Stopping previous POSTGRES docker containers";
    docker stop $containerId

    echo "Remove previous POSTGRES docker containers";
    docker rm $containerId

    echo "Starting docker container";
    docker run --name POSTGRES_USER -p "$DATABASE_PORT":"$DATABASE_PORT"  \
    -e POSTGRES_PASSWORD="$DATABASE_PASSWORD"  \
    -e POSTGRES_USER="$DATABASE_USER"  \
    -e POSTGRES_DB="$DATABASE_DB" \
    -d postgres

    echo "Waiting for POSTGRES container to start..."
    sleep 5s

}

function run_app {
    echo "Running the Node.js server";
    ts-node ./src/server.ts
}

function run_tests {
    echo "Running tests";
    nyc --clean --all --require ts-node/register \
        --require reflect-metadata/Reflect  \
        --extension .ts -- mocha --exit --timeout 5000  \
        **/*.test.ts
}

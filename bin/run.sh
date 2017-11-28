#!/bin/bash

echo "Installing npm dependencies";
npm install
npm install -g typescript ts-node

echo "Pulling POSTGRES docker image";
docker pull postgres

echo "Creating POSTGRES env variables";
export DATABASE_USER=postgres \
export DATABASE_PASSWORD=secret \
export DATABASE_HOST=localhost \
export DATABASE_PORT=5432 \
export DATABASE_DB=demo

containerId=$(docker ps -a -q --filter ancestor=postgres)

echo "Stopping previous POSTGRES docker containers";
docker stop $containerId

echo "Remove previous POSTGRES docker containers";
docker rm $containerId

echo "Starting docker container";
docker run --name POSTGRES_USER -p "$DATABASE_PORT":"$DATABASE_PORT"  \
-e POSTGRES_PASSWORD="$POSTGRES_PASSWORD"  \
-e POSTGRES_USER="$POSTGRES_USER"  \
-e POSTGRES_DB="$POSTGRES_DB" \
-d postgres

echo "Waiting for POSTGRES container to start..."
sleep 5s

echo "Running the Node.js server";
ts-node ./src/server.ts

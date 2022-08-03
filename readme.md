# nestjs-mongo-graphql

Movie graphql api including nestjs with mongo and graphql. Uses JWT for authentication mechanism.

> There is no refresh token mechanism. Default JWT token expires in 1h.

## Run

This project using docker-compose. So, you can simply run app running `docker-compose up -d` under project base directory.

## DB 

You can reach db from `http://localhost:8081` with mongo-express. Also exposed default mongo port to local which is `:27017` . You can use if you have any client with the [credentials.](./.configs/mongo.env)

## Graphql

Graphql playground is under `http://localhost:3000/graphql` by default.

# Project Cactus Backend

## Installation

1. Make a copy of `mv .env .env.local`
2. Create a database in MongoDB
3. Set `MONGO_URI` in .env.local to your installation: `mongodb://<host>/<database>`
4. Run `npm install`
5. Optional: import libraries.json in a collection called `libraries`

## Running the server

`npm run dev` for development (nodemon)

`npm start` for regular usage

## Test

`npm test` to run tests

## Other useful commands

`prettier --check ./src` checks the formatting on all files
`prettier --write ./src` formats all files

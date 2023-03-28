# Cactus

![Tests](https://github.com/ost-fh/Cactus/actions/workflows/tests.yml/badge.svg) ![Frontend Docker image](https://github.com/ost-fh/Cactus/actions/workflows/frontend-release.yml/badge.svg) ![Backend Docker image](https://github.com/ost-fh/Cactus/actions/workflows/backend-release.yml/badge.svg) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Welcome to Project Cactus!

"Is my favourite UI library accessible?" - "What UI Frameworks could I choose for my project that gives me a headstart in accessibility?" These are the questions project cactus tries to answer!

## Structure

The project is built on two containers:

**`frontend/`**

contains the frontend, a client for providing the website. It uses the [React library](https://reactjs.org/)

[More details](/frontend/README.md)

**`backend/`**

contains the backend of this application. It processes the db calls and handle the authentication. It's based on the [NestJs](https://nestjs.com/) processive node framework.

[More details](/backend/README.md)

## Hosting and Persistence

The newest production-ready release of this application is hosted by the Eastern Switzerland University of Applied Sciences (OST). In the background a [mongo DB](https://www.mongodb.com/) stores the test results and user profiles.

## Contribution

We appreciate your interest in contributing to our project. There are two mainly focused ways to contribute this project showed in this visualization.

![](docs/contribution-workflows.png | width=100)

All possible ways how you can contribute and the appropriate guidelines will you find in [CONTRIBUTING.md](/CONTRIBUTING.md)

## Support

**Funding**

![](docs/frh-logo.png | width=100)

**Maintaining and Development**

![](docs/logo-ost.jpg | width=100)

## License

[MIT](./LICENSE)

Copyright (c) 2022-present OST

# Rosoff-Dev

### A Portal For Developer Tools

Built on the Apollo Framework for GraphQL, this project implements a portal for several developer tools. Using a schema-first Graph approach, we implement an Apollo Server, with support for services such as authentication, logging, mocking, and testing. Our frontend is React based Apollo Client, utilizing hooks and new technology such as Webpack v5 and Typescript.

## Frontend

Built on the Apollo Framework, the frontend uses a React based client utilizing new hooks inside of function components. Combined with the beauty of GraphQL, this allows us to construct a beautiful, easy to use interface. We support a myriad of features to including the ability to spin up containers, similar to Amazon EC2. These containers support on demand customization of specs, such as vCPUs, vGPUs, RAM, and storage. We also support live on demand log tracing, and configurable routing.

## Backend

Again built on the Apollo Framework, the backend uses an Apollo Server built on Express. We use ES6 syntax throughout the server to match the frontend.

## Installation

### Node

We are currently using Node version `14.16.1`. This version add support for package level module enforcement. If you are using `nvm`, use the following command to activate the correct Node version.

```bash
nvm use
```

### Traditional Start

For a traditional start, install the node modules required by the project, and start both the web client and the server. The server will have production level database access.

```bash
npm install && npm start
```

### Testing

#### Mock Server

To start and test with the mock server, use the following command. The mock server is useful for constructing queries, or to test the frontend, assuming polling is not enabled for their component.

```bash
npm run mockServer
```

#### Docker

To run the application in a container, a Dockerfile is provided. The Dockerfile assumes you have already run the following commands in your terminal.

```bash
npm install
npm run buildServer
npm run buildWebsite
```

The image can then be run by Docker.

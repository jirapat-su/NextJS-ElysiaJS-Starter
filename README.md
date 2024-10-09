# NextJS ElysiaJS Starter

This project is a web application built with Next.JS and Elysia.JS, a modern, fast, and efficient web framework specifically designed for the Bun runtime.

# Prerequisites

Before you begin, ensure you have the following installed:

- [Bun](https://bun.sh/) (1.1.22 or higher)
- [Docker](https://www.docker.com/) (Optional, for containerized development)

## Install dependencies

To install the project dependencies, run:

```bash
bun install
```

## Set up environment variables

Copy the .env.example file, rename it to .env, and place it in the project root directory. This file will serve as the application's configuration.

```bash
cp .env.example .env
```

Edit the .env file and adjust the values as needed.

## Development

To start the development server run:

```bash
bun run dev
```

The application should now be running on http://localhost:3000.

## API Documentation

This project uses Elysia Swagger to provide API documentation. You can access the API documentation by navigating to http://localhost:3000/api/docs.

## Available Scripts

In the project directory, you can run the following scripts:

- `bun run dev` (Starts the development server)
- `bun run build` (Builds the app for production)
- `bun run start` (Runs the built app in production mode)
- `bun run lint` (Runs ESLint for code linting)
- `bun run format` (Formats code using Prettier)

## Docker Support

Build the Docker image:

```bash
docker build -t next-elysia-app .
```

Run the container:

```bash
docker run \
  -e PORT="3002" \
  -p 3002:3002 \
  next-elysia-app
```

The application will be available at http://localhost:3002.

## Acknowledgements

This project is built with the following technologies:

- [NextJS](https://nextjs.org/) (The React framework for production)
- [ReactJS](https://react.dev/) (A JavaScript library for building user interfaces)
- [ElysiaJS](https://elysiajs.com/) (The API framework used)
- [TypeScript](https://www.typescriptlang.org/) (A typed superset of JavaScript that compiles to plain JavaScript)
- [Bun](https://bun.sh/) (The JavaScript runtime and toolkit)

We're grateful to the developers and communities behind these amazing tools that make our project possible.

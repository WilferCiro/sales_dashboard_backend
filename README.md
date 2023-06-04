# NestJS Project with Hexagonal Architecture and SQL

This repository contains a NestJS project that follows the Hexagonal Architecture pattern and uses SQL as the underlying database.

## Project Structure

The project is structured into the following folders:

1. **application**: This folder contains the application layer of the Hexagonal Architecture. It defines the use cases and orchestrates the flow of data between the domain and infrastructure layers. Each use case is implemented as a separate module within this folder.

2. **domain**: The domain folder holds the core business logic and domain models of the application. It is independent of any external dependencies and represents the heart of the Hexagonal Architecture.

3. **architecture**: This folder contains the infrastructure implementation details. It includes frameworks, libraries, and databases. In this project, we use SQL as the underlying database, and the code for interacting with the database is placed within this folder.

## Prerequisites

Make sure you have the following prerequisites installed:

- Node.js (version v18.16.0 or higher)
- NPM (version 9.5.1)
- SQL database (e.g., PostgreSQL, MySQL, SQLite)

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository:

```bash
  git clone https://github.com/WilferCiro/sales_dashboard_backend.git
  cd sales_dashboard_backend
```

2. Install the dependencies:

```bash
  npm install
```

3. Configure the SQL database connection creating a .env file and add the sql database credentials, and other required environment variables

```bash
POSTGRES_HOST=HOST
POSTGRES_PORT=6543
POSTGRES_USER=USER
POSTGRES_PASSWORD=PASS
POSTGRES_DATABASE=postgres
MODE=DEV
RUN_MIGRATIONS=true

SECRET_JWT=SECRET_FOR_JWT

SENDGRID_API_KEY=
SENDGRID_USER=
SENDGRID_EMAIL=

PORT=5000
```

4. Start the application:

```bash
  npm run start
```

## Database Schema migration

```bash
  npm run build
  npm run typeorm:generate-migrations
  npm run typeorm:run-migrations
```

## Acknowledgments

- [NestJS](https://nestjs.com) - A progressive Node.js framework for building efficient and scalable web applications.
- [Hexagonal Architecture](<https://en.wikipedia.org/wiki/Hexagonal_architecture_(software)>) - A software architecture pattern that emphasizes loose coupling and separation of concerns.
- [SQL](https://en.wikipedia.org/wiki/SQL) - A programming language used for managing relational databases.

## Contact

For any questions or inquiries, please contact [wilcirom@gmail.com](mailto:wilcirom@gmail.com).


## All repositories for this project:

- [Sales backend](https://github.com/WilferCiro/sales_backend.git)
- [Sales dashboard backend](https://github.com/WilferCiro/sales_dashboard_backend.git)
- [Sales frontend](https://github.com/WilferCiro/sales_frontend.git)
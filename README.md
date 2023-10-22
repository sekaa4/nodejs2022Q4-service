# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Install [Docker](https://docs.docker.com/engine/install/)
- Run docker desktop application, if you use windows or run docker engine if you use other system

## Downloading

```
git clone {repository URL}
```

go to the copied folder, in your terminal and complete next command:

```
cd nodejs2023Q2-service
git checkout HLS-3
```

## Installing NPM modules

```
npm install
```

## Running application

- Create .env file (based on .env.example) in copied folder: ./.env
  - logging level stored in `LOG_LEVELS` environment variable (Note: valid logging level 0 <= n <= 4, default: `4`)
  - Max file size stored in `MAX_FILE_SIZE` environment variable, the value is specified in `kB`, default: `48`

- Run next command in your terminal, for building images and docker containers up:

```
docker-compose up -d
```

- App logs are written in the `./logs:/usr/app/logs` volume (`./logs` dir in app root)

After docker compose command complete and dockers starting you can open in your browser OpenAPI documentation by typing <http://localhost:4000/doc/> (port 4000 as default) and execute test queries.

## Testing

After application running in dockers open new terminal in your host machine and enter:

To run all tests with authorization

```
npm run test:auth
```

To run only one of all test suites

```
npm run test:auth -- <path to suite>
```

### Vulnerabilities scanning

```
npm run docker:scan
```

### Migrations

Migrations execute automatically when ```docker-compose``` command complete and create database entities.

If you want to migrate manually you can execute next command in your terminal:

```
rm -rf ./prisma/migrations
npx prisma migrate dev --name my-custom-migrate
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

## Work with Swagger (OpenAPI)

### Swagger (OpenAPI)

- link for server: [http://localhost:4000/doc](http://localhost:4000/doc)

- All endpoints (except `auth/signup`, `auth/login`, `/doc` and `/`) are protected with JWT authentication.
You should provide JWT token in `Authorization: Bearer <jwt_token>` request header, but for `auth/refresh` route you should provide JWT refresh token in request body:

```
{refreshToken: 'your_token'}
```

1. Sign Up via `auth/signup`. (Note: Login is unique field in db, and you can create only one user with such login.)
2. Login with your `login` and `password` and get tokens via `auth/login`
3. Press `Authorize` button and use your `accessToken`

## Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: <https://code.visualstudio.com/docs/editor/debugging>

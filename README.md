# 0x04. Files Manager

## Project Overview
This project is a comprehensive back-end development exercise summarizing key concepts such as authentication, NodeJS, MongoDB, Redis, pagination, and background processing. The objective is to build a simple platform to upload and view files.

### Key Features:
- User authentication via a token
- List all files
- Upload a new file
- Change permission of a file
- View a file
- Generate thumbnails for images

### Team
- Chelaa Ruto

## Resources
To complete this project, you may find the following resources helpful:
- [Node JS getting started](https://nodejs.org/en/docs/guides/getting-started-guide/)
- [Process API doc](https://nodejs.org/dist/latest-v12.x/docs/api/process.html)
- [Express getting started](https://expressjs.com/en/starter/installing.html)
- [Mocha documentation](https://mochajs.org/)
- [Nodemon documentation](https://nodemon.io/)
- [MongoDB](https://docs.mongodb.com/)
- [Bull](https://github.com/OptimalBits/bull)
- [Image thumbnail](https://www.npmjs.com/package/image-thumbnail)
- [Mime-Types](https://www.npmjs.com/package/mime-types)
- [Redis](https://redis.io/documentation)

## Provided Files
- `package.json`
- `.eslintrc.js`
- `babel.config.js`

**Note:** Run `$ npm install` when you have the `package.json`.

## Tasks

### 0. Redis utils
Create a `redis.js` file in the `utils` folder containing the class `RedisClient` with the following methods:
- `isAlive`: returns true if the connection to Redis is successful, otherwise false.
- `get`: takes a string key and returns the Redis value stored for this key.
- `set`: takes a string key, a value, and a duration in seconds to store in Redis (with expiration set by duration).
- `del`: takes a string key and removes the value in Redis for this key.

### 1. MongoDB utils
Create a `db.js` file in the `utils` folder containing the class `DBClient` with the following methods:
- `isAlive`: returns true if the connection to MongoDB is successful, otherwise false.
- `nbUsers`: returns the number of documents in the `users` collection.
- `nbFiles`: returns the number of documents in the `files` collection.

### 2. First API
Create the Express server in `server.js`:
- Listen on the port set by the environment variable `PORT` or default to 5000.
- Load all routes from `routes/index.js`.

Create `routes/index.js` with the following endpoints:
- `GET /status` => `AppController.getStatus`
- `GET /stats` => `AppController.getStats`

Create `AppController.js` with:
- `getStatus`: returns if Redis and the DB are alive.
- `getStats`: returns the number of users and files in the DB.

### 3. Create a new user
Add `POST /users` endpoint in `routes/index.js` to create a new user.

Create `UsersController.js` with:
- `postNew`: creates a new user in the DB with an email and password.

### 4. Authenticate a user
Add the following endpoints in `routes/index.js`:
- `GET /connect` => `AuthController.getConnect`
- `GET /disconnect` => `AuthController.getDisconnect`
- `GET /users/me` => `UsersController.getMe`

Create `AuthController.js` with:
- `getConnect`: signs in the user and generates a new authentication token.
- `getDisconnect`: signs out the user based on the token.

Create `UsersController.js` with:
- `getMe`: retrieves the user based on the token.

### 5. First file
Add `POST /files` endpoint in `routes/index.js` to create a new file in the DB and on disk.

Create `FilesController.js` with:
- `postUpload`: creates a new file in the DB and on disk based n user input.

## Installation
1. Clone this repository and switch to the cloned repository's directory.

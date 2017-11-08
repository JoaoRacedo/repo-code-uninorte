# API

Every API endpoint that requires authentication is secured with JSON Web Tokens (JWT). If the status code is <400 then the request executed correctly. Otherwise an object will be returned with a message property. You may show the message to the end user.

Path segments that begin with (:) indicate variables.

## Usage

Before beginning to use you must install `redis` and `postgres` and have them running. In `server/.env` you need to define the necessary environment variables for the server to connect to the database. `server/.env.example` has the necessary keys defined, except for `DB_USER`, `DB_PASSWORD`, and `DB_DATABASE`, you must fill these yourself. You must also run the following commands inside the server folder to set up the database:

To install the Adonis CLI:
```bash
$ yarn global add @adonisjs/cli
```

To install all dependencies:
```bash
$ yarn
```

To set up the database with the correct schema:
```bash
$ adonis migration:run
```

To insert the default admin user:
```bash
$ adonis seed
```

To start running the server:
```bash
$ adonis serve --dev
```

All routes are prefixed with /api/v1. To use authenticated routes you must provide the JWT token in the Authorization header as:

```
Authorization: Bearer <token>
```

To get a JWT token call /api/v1/login/email with the user credentials.

Required headers on all routes:

```
Accept: application/json
Content-Type: application/json
```

## GET /projects/:id
- Description: Fetches a project by id.
- Auth: No
- Returns:
    - data: object

## GET /projects/:id/ratings
- Description: Fetches the average rating of the project.
- Auth: No
- Returns:
    - data: object
        - stars: number

## GET /projects
- Description: Searches projects by tags.
- Auth: No
- Query:
    - tags: string
- Returns:
    - data: array of objects

## GET /users
- Description: Displays users.
- Auth: Yes
- Scopes: Admin
- Query:
    - name: string
    - page: number
- Returns:
    - data: array of objects

## GET /admins
- Description: Displays admin users.
- Auth: Yes
- Scopes: Admin
- Query:
    - page: number
- Returns:
    - data: array of objects

## GET /users/:id
- Description: Fetches an user's profile.
- Auth: No
- Returns:
    - data: object

## GET /users/:id/projects
- Description: Fetches an user's projects.
- Auth: No
- Returns:
    - data: array of objects

## POST /login/email
- Description: Fetches user credentials.
- Auth: No
- Body:
    - name: string
    - description: string
    - email: string
    - password: string
- Returns:
    - data: object

## POST /users
- Description: Creates a new user (Sign Up).
- Auth: No
- Body:
    - name: string
    - email: string
    - description: string
- Returns:
    - data: object

## POST /projects
- Description: Creates a new project.
- Auth: Yes
- Body:
    - name: string
    - description: string
    - tags: array of strings
    - collaborators: array of ids
- Returns:
    - data: object

## POST /projects/:projectId/ratings
- Description: Submits a rating of a project.
- Auth: Yes
- Body:
    - stars: number
- Returns:
    - data: object

## POST /admins
- Description: Adds user to admins.
- Auth: Yes
- Scopes: Admin
- Body:
    - email: string
- Returns:
    - data: object

## PUT /users/:id
- Description: Updates my user's profile.
- Auth: Yes
- Body:
    - name: string
    - email: string
    - description: string
- Returns:
    - data: object

## PUT /users/:id/avatar
- Description: Updates my user's profile. Accepts only Form Data as input.
- Auth: Yes
- Body:
    - avatar
- Returns:
    - data: object

## PUT /projects/:id
- Description: Updates a project's info.
- Auth: Yes
- Scopes: Project Owner
- Body:
    - name: string
    - description: string
    - tags: array of strings
    - collaborators: array of ids
- Returns:
    - data: object

## PUT /projects/:projectId/files
- Description: Updates a project's files. Accepts only Form Data as input.
- Auth: Yes
- Scopes: Project Owner
- Body:
    - files
- Returns:
    - data: object

## DELETE /projects/:projectId
- Description: Delete a project
- Auth: Yes
- Scopes: Admin, Project Owner

## DELETE /admins
- Description: Deletes user from admins.
- Auth: Yes
- Scopes: Admin
- Body:
    - email: string

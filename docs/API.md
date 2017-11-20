# API

Every API endpoint that requires authentication is secured with JSON Web Tokens (JWT). If the status code is <400 then the request executed correctly. Otherwise an object will be returned with a message property. You may show the message to the end user.

Path segments that begin with (:) indicate variables.

## GET /projects/:projectId
- Description: Fetches a project by id.
- Auth: No
- Returns:
    - project: object

## GET /search
- Description: Searches projects by tags.
- Auth: No
- Query:
    - tags: string
- Returns:
    - projects: array of objects

## GET /users
- Description: Displays users.
- Auth: Yes
- Scopes: Admin
- Query:
    - page: number
- Returns:
    - users: array of objects

## GET /admins
- Description: Displays admin users.
- Auth: Yes
- Scopes: Admin
- Query:
    - page: number
- Returns:
    - admins: array of objects

## GET /users/:userId
- Description: Fetches an user's profile.
- Auth: No
- Returns:
    - user: object

## GET /users/:userId/projects
- Description: Fetches an user's projects.
- Auth: No
- Returns:
    - projects: array of objects

## POST /users
- Description: Creates a new user (Sign Up).
- Auth: No
- Body:
    - name: string
    - email: string
    - description: string
    - password: string
    - confirm: string
- Returns:
    - user: object

## POST /login
- Description: Logs into the system.
- Auth: No
- Body:
    - email: string
    - password: string
- Returns:
    - user: object
    - credentials: string

## POST /projects
- Description: Creates a new project.
- Auth: Yes
- Body:
    - name: string
    - description: string
    - technologies: string
    - tags: array of strings
    - files: base64 string
- Returns:
    - project: object

## POST /projects/:projectId/rating
- Description: Submits a rating of a project.
- Auth: Yes
- Body:
    - stars: number

## POST /admins
- Description: Adds user to admins.
- Auth: Yes
- Scopes: Admin
- Body:
    - email: string

## PUT /profile
- Description: Updates my user's profile.
- Auth: Yes
- Body:
    - name: string
    - email: string
    - description: string
- Returns:
    - user: object

## PUT /projects/:projectId
- Description: Updates a project's info
- Auth: Yes
- Scopes: Project Owner
- Body:
    - name: string
    - description: string
    - technologies: string
    - tags: array of strings
- Returns:
    - project: object

## PUT /projects/:projectId/files
- Description: Updates a project's files
- Auth: Yes
- Scopes: Project Owner
- Body:
    - files: base64 string

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

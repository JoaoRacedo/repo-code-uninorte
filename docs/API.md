# API

Every API endpoint that requires authentication is secured with JSON Web Tokens (JWT). If the status code is <400 then the request executed correctly. Otherwise an object will be returned with a message property. You may show the message to the end user.

Path segments that begin with (:) indicate variables.

## GET /projects/:projectId
- Description: Fetches a project by id.
- Auth: No
- Returns:
    - data: object

## GET /search
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

## GET /users/:userId
- Description: Fetches an user's profile.
- Auth: No
- Returns:
    - data: object

## GET /users/:userId/projects
- Description: Fetches an user's projects.
- Auth: No
- Returns:
    - data: array of objects

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
    - project: object

## POST /projects/:projectId/rating
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

## PUT /profile
- Description: Updates my user's profile.
- Auth: Yes
- Body:
    - name: string
    - email: string
    - description: string
- Returns:
    - data: object

## PUT /profile/avatar
- Description: Updates my user's profile.
- Auth: Yes
- Returns:
    - data: object

## PUT /projects/:projectId
- Description: Updates a project's info
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
- Description: Updates a project's files
- Auth: Yes
- Scopes: Project Owner
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

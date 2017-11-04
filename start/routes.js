'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/guides/routing
|
*/

const Route = use('Route')

Route
  .group(() => {
    Route.get('/projects', 'ProjectController.list')
    Route.get('/projects/:id', 'ProjectController.fetch')
    Route.post('/projects', 'ProjectController.create').validator('Project')
    Route.put('/projects/:id', 'ProjectController.update').validator('Project')
    Route.delete('/projects/:id', 'ProjectController.delete')

    Route.get('/users/:id', 'UserController.fetch')
    Route.get('/users/:id/projects', 'UserController.fetchProjects')
    Route.post('/users', 'UserController.create')
    Route.put('/profile', 'UserController.update').validator('User')

    Route.get('/protected', async ({ request, response }) => {
      response.send('OK')
    })
  })
  .prefix('/api/v1')

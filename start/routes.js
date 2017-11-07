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

const prefix = '/api/v1'

Route
  .group(() => {
    Route.get('/ok', () => 'OK')

    Route.post('/login/email', 'CredentialController.signInWithEmailAndPassword')

    Route.get('/projects', 'ProjectController.list')
    Route.get('/projects/:id', 'ProjectController.fetch')
    Route.get('/projects/:id/files', 'ProjectController.getFiles')
    Route.get('/projects/:id/ratings', 'ProjectController.getRatings')

    Route.get('/users/:id', 'UserController.fetch')
    Route.get('/users/:id/avatar', 'UserController.getAvatar')
    Route.get('/users/:id/projects', 'UserController.fetchProjects')
    Route.post('/users', 'UserController.create')
  })
  .prefix(prefix)

// authenticated routes
Route
  .group(() => {
    Route.post('/projects', 'ProjectController.create').validator('Project')

    Route.put('/projects/:id', 'ProjectController.update')
      .validator('Project')
      .middleware(['projectBelongsToUser'])

    Route.put('/projects/:id/files', 'ProjectController.updateFiles').middleware(['projectBelongsToUser']) // FIXME:

    Route.delete('/projects/:id', 'ProjectController.delete')

    Route.post('/projects/:id/ratings', 'ProjectController.postRating').validator('ProjectRating')

    Route.put('/users/:id', 'UserController.update')
      .middleware(['isUser'])

    Route.put('/users/:id/avatar', 'UserController.updateAvatar').middleware(['isUser'])
  })
  .prefix(prefix)
  .middleware(['auth'])

// admin routes
Route
  .group(() => {
    Route.get('/users', 'UserController.list')

    Route.get('/admins', 'AdminController.list')
    Route.post('/admins', 'AdminController.add')
    Route.delete('/admins', 'AdminController.remove')
  })
  .prefix(prefix)
  .middleware(['auth', 'admin'])

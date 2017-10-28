'use strict'

const Project = use('App/Model/Project')

class ProjectsController {
  * fetch (request, response) {
    const projects = yield Project.all()
    yield response.json({ projects })
  }
}

module.exports = ProjectsController

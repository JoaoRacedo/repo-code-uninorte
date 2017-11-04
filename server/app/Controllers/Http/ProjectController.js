'use strict'

const Helpers = use('Helpers')
const ProjectModel = use('App/Models/Project')

class ProjectController {
  async list ({ request, response }) {
    const data = await ProjectModel.all()
    return response.json({ data })
  }

  async fetch ({ request, response }) {

  }

  async create ({ request, response }) {

  }

  async update ({ request, response }) {

  }

  async uploadFile ({ request, response }) {
    const file = request.file('file', {
      maxSize: '20mb'
    })

    // curl -F file=@/Users/sebastian/Pictures/photo.jpg http://localhost:3333/uploads
    await file.move(Helpers.tmpPath('uploads'), `1.${file.extension()}`)

    if (!file.moved()) {
      return file.error()
    }

    return { message: 'File uploaded successfully' }
  }
}

module.exports = ProjectController

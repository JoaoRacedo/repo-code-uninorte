'use strict'

const Database = use('Database')
const Drive = use('Drive')
const Helpers = use('Helpers')

const ProjectModel = use('App/Models/Project')
const ProjectRatingModel = use('App/Models/ProjectRating')
const UserModel = use('App/Models/User')

class ProjectController {
  async list ({ request, response }) {
    const { tags } = request.get()
    console.log(tags)
    console.log(typeof tags)

    let query = ProjectModel.query()

    for (const tag of tags) {
      query = query.orWhereHas('tags', (builder) => {
        builder.where('tag', '=', tag)
      })
    }

    const data = await query.fetch()

    return response.json({ data })
  }

  async fetch ({ params }) {
    const { id } = params
    const data = await ProjectModel.find(id)
    return { data }
  }

  async create ({ auth, request, response }) {
    const { user_id: userId } = await auth.getUser()
    const payload = request.post()
    const { name, description, tags, collaborators } = payload
    const project = await ProjectModel.create({ name, description })

    const tagData = tags.map(tag => ({ tag }))
    const ownerData = [userId]

    await Promise.all([
      project.tags().createMany(tagData),
      project.owners().attach(ownerData),
      project.collaborators().attach(collaborators)
    ])

    const data = await ProjectModel.find(project.id)
    return { data }
  }

  async update ({ params, request, response }) {
    const payload = request.post()
    const { name, description, tags, collaborators } = payload
    const project = await ProjectModel.find(params.id)

    await Promise.all([
      project.tags().delete(),
      project.collaborators().detach()
    ])

    project.fill({ name, description })
    project.id = params.id

    const tagData = tags.map(tag => ({ tag }))

    await Promise.all([
      project.tags().createMany(tagData),
      project.collaborators().attach(collaborators)
    ])

    const data = await ProjectModel.find(project.id)
    return { data }
  }

  async delete ({ auth, params, request, response }) {
    const { user_id: userId } = await auth.getUser()

    const [user, project] = await Promise.all([
      UserModel.find(userId),
      ProjectModel.find(params.id)
    ])

    const [hasAdminScope, belongsToUser] = await Promise.all([
      user.hasAdminScope(),
      project.belongsToUser(user)
    ])

    if (!hasAdminScope && !belongsToUser) {
      response.status(403).send({ message: 'No tienes acceso a este recurso' })
    }

    await project.delete()

    return {}
  }

  async getRatings ({ params, request }) {
    const { id } = params

    const [{ avg }] = await Database.from('project_ratings')
      .avg('stars')
      .where('project_id', id)

    const stars = (avg && Math.round(Number.parseFloat(avg))) || 0
    return { data: { stars } }
  }

  async postRating ({ auth, params, request }) {
    const { id } = params
    const { user_id } = await auth.getUser()
    const { stars } = request.post()

    const [user, project] = await Promise.all([
      UserModel.find(user_id),
      ProjectModel.find(id)
    ])

    const data = await ProjectRatingModel.updateRating(user, project, stars)

    return { data }
  }

  async getFiles ({ params, response }) {
    const { id } = params

    const filepath = `files/${id}.zip`
    const fileExists = await Drive.exists(filepath)

    if (!fileExists) {
      response.status(404).send({ message: 'No se encontro el archivo' })
      return
    }

    response.attachment(Helpers.tmpPath(filepath))
  }

  async updateFiles ({ params, request, response }) {
    const { id } = params

    const file = request.file('files', {
      size: '20mb'
    })

    const ext = file.stream.filename.split('.').pop() // HACK: this used to be possible

    if (ext !== 'zip') {
      response.status(400).send({ message: 'Debe subir un archivo .zip' })
      return
    }

    const name = `${id}.${ext}`
    const filepath = `files/${name}`

    await Drive.delete(filepath)

    await file.move(Helpers.tmpPath('files'), { name })

    if (!file.moved()) {
      return file.error()
    }

    return { message: 'File uploaded successfully' }
  }
}

module.exports = ProjectController

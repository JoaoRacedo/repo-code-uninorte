'use strict'

const Database = use('Database')
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
}

module.exports = ProjectController

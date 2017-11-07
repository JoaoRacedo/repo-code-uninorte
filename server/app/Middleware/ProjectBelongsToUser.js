'use strict'

const ProjectModel = use('App/Models/Project')
const UserModel = use('App/Models/User')

class ProjectBelongsToUser {
  async handle ({ auth, params, response }, next) {
    const { user_id: userId } = await auth.getUser()
    const user = await UserModel.find(userId)
    const project = await ProjectModel.find(params.id)
    const belongsToUser = await project.belongsToUser(user)

    if (!belongsToUser) {
      response.status(403).send({ message: 'No tienes acceso a este recurso' })
      return
    }

    await next()
  }
}

module.exports = ProjectBelongsToUser

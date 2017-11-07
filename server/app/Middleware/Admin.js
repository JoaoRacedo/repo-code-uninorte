'use strict'

const UserModel = use('App/Models/User')

class Admin {
  async handle ({ auth, response }, next) {
    const { user_id: userId } = await auth.getUser()
    const user = await UserModel.find(userId)
    const hasAdminScope = await user.hasAdminScope()

    if (!hasAdminScope) {
      response.status(403).send({ message: 'No tienes acceso a este recurso' })
      return
    }

    await next()
  }
}

module.exports = Admin

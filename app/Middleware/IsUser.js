'use strict'

const UserModel = use('App/Models/User')

class IsUser {
  async handle ({ auth, params, response }, next) {
    const { user_id: userId } = await auth.getUser()
    const user = await UserModel.find(params.id)

    if (userId !== user.id) {
      response.status(403).send({ message: 'No tienes acceso a este recurso' })
      return
    }

    await next()
  }
}

module.exports = IsUser

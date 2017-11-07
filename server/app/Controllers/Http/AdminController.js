'use strict'

const UserModel = use('App/Models/User')

class AdminController {
  async list ({ request }) {
    const { page } = request.get()

    let dataSnapshot = await UserModel
      .query()
      .whereHas('scopes', (builder) => {
        builder.where('scope', '=', 'admin')
      })
      .paginate(page)

    const data = dataSnapshot.toJSON()

    return data
  }

  async add ({ request, response }) {
    const { email } = request.post()
    const { rows } = await UserModel.query()
      .whereHas('credentials', (builder) => {
        builder.where('email', '=', email)
      })
      .fetch()

    if (rows.length === 0) {
      response.status(404).send({ message: 'No se encontro a un usuario con este correo' })
      return
    }

    const user = rows[0]
    const scopesSnapshot = await user.scopes().fetch()
    const scopes = scopesSnapshot.toJSON() || []

    if (!scopes.find(item => item.scope === 'admin')) {
      await user.scopes().create({ scope: 'admin' })
    }

    const data = await UserModel.find(user.id)
    return { data: data.toJSON() }
  }

  async remove ({ request, response }) {
    const { email } = request.post()
    const { rows } = await UserModel.query()
      .whereHas('credentials', (builder) => {
        builder.where('email', '=', email)
      })
      .fetch()

    if (rows.length === 0) {
      response.status(404).send({ message: 'No se encontro a un usuario con este correo' })
      return
    }

    const user = rows[0]
    await user.scopes().where('scope', 'admin').delete()

    const data = await UserModel.find(user.id)
    return { data: data.toJSON() }
  }
}

module.exports = AdminController

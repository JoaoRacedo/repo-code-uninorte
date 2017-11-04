'use strict'

const UserModel = use('App/Models/User')

class UserController {
  async fetch ({ request, response }) {
    return UserModel.find(request.param('id'))
  }

  async fetchProjects ({ request, response }) {

  }

  async create ({ request, response }) {
    const data = await User.create(request.post())
    return { data }
  }

  async update ({ request, response }) {

  }
}

module.exports = UserController

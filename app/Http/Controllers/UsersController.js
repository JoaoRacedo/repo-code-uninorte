'use strict'

const User = use('App/Model/User')

class UsersController {
  * fetch (request, response) {
    const users = yield User.all()
    yield response.json({ users })
  }

  * fetchById (request, response) {

  }

  * create (request, response) {
    const user = yield User.create(request.post())
    yield response.json({ user })
  }
}

module.exports = UsersController

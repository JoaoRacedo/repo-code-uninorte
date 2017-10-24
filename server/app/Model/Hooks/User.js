'use strict'

const UserModel = use('App/Model/User')
const Validator = use('Validator')

const User = exports = module.exports = {}

User.validation = function * (next) {
  const validation = yield Validator.validateAll(this, UserModel.rules)

  if (validation.fails()) {
    const error = new Error('Ocurrio un error de validacion.')
    error.name = 'ValidationError'
    error.errors = validation.messages()
    error.status = 400
    throw error
  }

  yield next
}

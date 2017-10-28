'use strict'

const Validator = use('Validator')

module.exports = (Model) => function * (next) {
  const validation = yield Validator.validateAll(this, Model.rules)

  if (validation.fails()) {
    const error = new Error('Ocurrio un error de validacion.')
    error.name = 'ValidationError'
    error.errors = validation.messages()
    error.status = 400
    throw error
  }

  yield next
}

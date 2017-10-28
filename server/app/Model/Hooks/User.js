'use strict'

const UserModel = use('App/Model/User')
const Validation = use('App/Model/Hooks/Utils/Validation')

const User = exports = module.exports = {}

User.validation = Validation(UserModel)

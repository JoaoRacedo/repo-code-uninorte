'use strict'

const Model = use('Model')

class User extends Model {
  scopes () {
    return this.hasMany('App/Model/Scope')
  }
}

module.exports = User

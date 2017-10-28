'use strict'

const Lucid = use('Lucid')

class User extends Lucid {
  static boot () {
    super.boot()
    this.addHook('beforeCreate', 'User.validation')
    this.addHook('beforeUpdate', 'User.validation')
  }

  static get rules () {
    return {
      name: 'required',
      email: 'required|email|unique:users',
      description: 'required'
    }
  }

  scopes () {
    return this.hasMany('App/Model/Scope')
  }
}

module.exports = User

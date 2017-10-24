'use strict'

const Lucid = use('Lucid')

class User extends Lucid {
  static boot () {
    super.boot()
    this.addHook('beforeCreate', 'User.validation')
  }

  static get rules () {
    return {
      name: 'required',
      email: 'required|email|unique:users',
      description: 'required',
      avatar: 'url'
    }
  }
}

module.exports = User

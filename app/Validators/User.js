'use strict'

class User {
  get rules () {
    return {
      name: 'required',
      email: 'required|email|unique:users',
      description: 'required'
    }
  }
}

module.exports = User

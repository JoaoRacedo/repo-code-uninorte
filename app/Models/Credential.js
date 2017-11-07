'use strict'

const Model = use('Model')

class Credential extends Model {
  static boot () {
    super.boot()
    this.addHook('beforeSave', 'CredentialHook.hashPassword')
  }

  static get hidden () {
    return ['password']
  }

  user () {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = Credential

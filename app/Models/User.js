'use strict'

const Model = use('Model')

class User extends Model {
  static boot () {
    super.boot()
    this.addGlobalScope(builder => builder.with('scopes'))
    this.addHook('afterFind', 'UserHook.fetchEmail')
  }

  credentials () {
    return this.hasOne('App/Models/Credential')
  }

  scopes () {
    return this.hasMany('App/Models/Scope')
  }

  projects () {
    return this.belongsToMany('App/Models/Project')
      .pivotTable('project_owners')
      .withTimestamps()
  }

  ratings () {
    return this.hasMany('App/Models/Rating')
  }

  async hasAdminScope () {
    const scopes = await this.scopes().fetch()
    return scopes.toJSON().find(item => item.scope === 'admin')
  }
}

module.exports = User

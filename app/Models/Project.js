'use strict'

const Model = use('Model')

class Project extends Model {
  static boot () {
    super.boot()
    this.addGlobalScope(builder => builder.with('tags').with('owners').with('collaborators'))
  }

  tags () {
    return this.hasMany('App/Models/ProjectTag')
  }

  ratings () {
    return this.hasMany('App/Models/Rating')
  }

  owners () {
    return this.belongsToMany('App/Models/User')
      .pivotTable('project_owners')
      .withTimestamps()
  }

  collaborators () {
    return this.belongsToMany('App/Models/User')
      .pivotTable('project_collaborators')
      .withTimestamps()
  }

  async belongsToUser (user) {
    const ownersSnapshot = await this.owners().where('user_id', user.id).fetch()
    const owners = ownersSnapshot.toJSON()
    return owners.find(item => item.id === user.id)
  }
}

module.exports = Project

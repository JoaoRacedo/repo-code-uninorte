'use strict'

const Model = use('Model')

class Project extends Model {
  tags () {
    return this.hasMany('App/Model/ProjectTag')
  }

  owners () {
    return this.belongsToMany('App/Model/User', 'project_owners')
  }

  collaborators () {
    return this.belongsToMany('App/Model/User', 'project_collaborators')
  }
}

Project.addGlobalScope(function (builder) {
  builder.with('tags').with('owners').with('collaborators')
})

module.exports = Project

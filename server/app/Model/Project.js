'use strict'

const Lucid = use('Lucid')

class Project extends Lucid {
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

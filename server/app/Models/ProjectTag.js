'use strict'

const Model = use('Model')

class ProjectTag extends Model {
  project () {
    return this.belongsTo('App/Model/Project')
  }
}

module.exports = ProjectTag

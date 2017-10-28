'use strict'

const Lucid = use('Lucid')

class ProjectTag extends Lucid {
  project () {
    return this.belongsTo('App/Model/Project')
  }
}

module.exports = ProjectTag

'use strict'

const Schema = use('Schema')

class ProjectTagsTableSchema extends Schema {

  up () {
    this.create('project_tags', (table) => {
      table.increments()
      table.integer('project_id').notNullable()
      table.foreign('project_id').references('projects.id')
      table.text('tag').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('project_tags')
  }

}

module.exports = ProjectTagsTableSchema

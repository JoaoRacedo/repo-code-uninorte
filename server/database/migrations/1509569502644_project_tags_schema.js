'use strict'

const Schema = use('Schema')

class ProjectTagsSchema extends Schema {
  up () {
    this.create('project_tags', (table) => {
      table.increments()
      table.integer('project_id').notNullable().references('projects.id').onDelete('CASCADE')
      table.text('tag').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('project_tags')
  }
}

module.exports = ProjectTagsSchema

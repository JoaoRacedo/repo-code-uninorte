'use strict'

const Schema = use('Schema')

class ProjectOwnersSchema extends Schema {
  up () {
    this.create('project_owners', (table) => {
      table.increments()
      table.integer('project_id').notNullable()
      table.foreign('project_id').references('projects.id')
      table.integer('user_id').notNullable()
      table.foreign('user_id').references('users.id')
      table.timestamps()
    })
  }

  down () {
    this.drop('project_owners')
  }
}

module.exports = ProjectOwnersSchema

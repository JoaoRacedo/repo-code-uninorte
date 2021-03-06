'use strict'

const Schema = use('Schema')

class ProjectOwnersSchema extends Schema {
  up () {
    this.create('project_owners', (table) => {
      table.increments()
      table.integer('project_id').notNullable().references('projects.id').onDelete('CASCADE')
      table.integer('user_id').notNullable().references('users.id').onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('project_owners')
  }
}

module.exports = ProjectOwnersSchema

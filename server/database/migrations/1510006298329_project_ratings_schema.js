'use strict'

const Schema = use('Schema')

class ProjectRatingsSchema extends Schema {
  up () {
    this.create('project_ratings', (table) => {
      table.increments()
      table.integer('project_id').notNullable().references('projects.id').onDelete('CASCADE')
      table.integer('user_id').notNullable().references('users.id').onDelete('CASCADE')
      table.integer('stars').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('project_ratings')
  }
}

module.exports = ProjectRatingsSchema

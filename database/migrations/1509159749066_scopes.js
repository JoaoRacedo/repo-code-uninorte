'use strict'

const Schema = use('Schema')

class ScopesTableSchema extends Schema {

  up () {
    this.create('scopes', (table) => {
      table.increments()
      table.integer('user_id').notNullable()
      table.foreign('user_id').references('users.id')
      table.text('scope').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('scopes')
  }

}

module.exports = ScopesTableSchema

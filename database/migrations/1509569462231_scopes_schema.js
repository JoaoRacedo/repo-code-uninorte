'use strict'

const Schema = use('Schema')

class ScopesSchema extends Schema {
  up () {
    this.create('scopes', (table) => {
      table.increments()
      table.integer('user_id').notNullable().references('users.id').onDelete('CASCADE')
      table.text('scope').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('scopes')
  }
}

module.exports = ScopesSchema

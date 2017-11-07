'use strict'

const Schema = use('Schema')

class CredentialsSchema extends Schema {
  up () {
    this.create('credentials', (table) => {
      table.increments()
      table.integer('user_id').unique().notNullable().references('users.id').onDelete('CASCADE')
      table.text('email').unique().notNullable()
      table.text('password').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('credentials')
  }
}

module.exports = CredentialsSchema

'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')

class UserSeeder {
  async run () {
    const user = await Factory
      .model('App/Models/User')
      .create()

    await user.credentials().create({
      email: 'admin@uninorte.edu.co',
      password: '123456'
    })
  }
}

module.exports = UserSeeder

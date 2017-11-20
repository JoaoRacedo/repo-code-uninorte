'use strict'

const UserModel = use('App/Models/User')

class CredentialController {
  async signInWithEmailAndPassword ({ request, auth }) {
    const { email, password } = request.post()
    const data = await auth.attempt(email, password)
    const user = await UserModel.findBy('email', email)
    return { data, user }
  }
}

module.exports = CredentialController

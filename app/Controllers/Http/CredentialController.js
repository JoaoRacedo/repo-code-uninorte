'use strict'

const CredentialModel = use('App/Models/Credential')
const UserModel = use('App/Models/User')

class CredentialController {
  async signInWithEmailAndPassword ({ request, auth }) {
    const { email, password } = request.post()
    const data = await auth.attempt(email, password)
    const credential = await CredentialModel.findBy('email', email)
    const user = await UserModel.find(credential.user_id)
    return { data, user }
  }
}

module.exports = CredentialController

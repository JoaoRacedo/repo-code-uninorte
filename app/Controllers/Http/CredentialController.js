'use strict'

class CredentialController {
  async signInWithEmailAndPassword ({ request, auth }) {
    const { email, password } = request.post()
    const data = await auth.attempt(email, password)
    return { data }
  }
}

module.exports = CredentialController

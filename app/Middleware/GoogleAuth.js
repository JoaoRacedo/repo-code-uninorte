'use strict'

const GoogleAuth = require('google-auth-library')

const Helpers = use('Helpers')
const Env = use('Env')

const CLIENT_ID = Env.get('GOOGLE_CLIENT_ID')
const auth = new GoogleAuth();
const client = new auth.OAuth2(CLIENT_ID, '', '')
const verifyIdToken = Helpers.promisify(client.verifyIdToken)

class GoogleAuth {
  async handle ({ request, response }, next) {
    const authorization = request.headers('Authorization')
    const [type, creds] = authorization.split(' ').filter(item => item !== '')

    try {
      const login = await verifyIdToken(creds, CLIENT_ID)
      await next()
    } catch (e) {
      response.status(403).send({})
    }
  }
}

module.exports = GoogleAuth

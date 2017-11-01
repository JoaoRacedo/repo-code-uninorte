'use strict'

const User = use('App/Model/User')

class LoginController {
  * redirect (request, response) {
    yield request.ally.driver('google').redirect()
  }

  * handleCallback (request, response) {
    const googleUser = yield request.ally.driver('google').getUser()

    // verify that the domain is uninorte.edu.co

    const searchAttr = {
      email: googleUser.getEmail()
    }

    const newUser = {
      email: googleUser.getEmail(),
      username: googleUser.getName()
    }

    const user = yield User.findOrCreate(searchAttr, newUser)

    // const result = yield request.auth.loginViaId(user.id)

    const accessToken = googleUser.getAccessToken()
    const refreshToken = googleUser.getRefreshToken()
    const expires = googleUser.getExpires()

    const credentials = { accessToken, refreshToken, expires }
    console.log(credentials)

    response.redirect('/home')
  }
}

module.exports = LoginController

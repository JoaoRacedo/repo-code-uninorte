'use strict'

const UserHook = exports = module.exports = {}

UserHook.fetchEmail = async (user) => {
  const credentials = await user.credentials().fetch()
  user.email = credentials.email
}

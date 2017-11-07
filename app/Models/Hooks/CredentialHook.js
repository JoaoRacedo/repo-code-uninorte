'use strict'

const Hash = use('Hash')
const CredentialHook = exports = module.exports = {}

CredentialHook.hashPassword = async (credential) => {
  credential.password = await Hash.make(credential.password)
}

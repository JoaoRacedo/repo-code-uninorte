'use strict'

const Helpers = use('Helpers')
const { validateAll } = use('Validator')

const CredentialModel = use('App/Models/Credential')
const UserModel = use('App/Models/User')

const profileRules = {
  name: 'string|required',
  description: 'string|required'
}

const profileMessages = {
  'name.string': 'Debe suministrar su nombre',
  'name.required': 'Debe suministrar su nombre',
  'description.string': 'Debe suministrar una descripcion',
  'description.required': 'Debe suministrar una descripcion'
}

const credentialRules = {
  ...profileRules,
  email: 'required|email|regex:.*@uninorte.edu.co',
  password: 'required|min:6'
}

const credentialMessages = {
  ...profileMessages,
  'email.required': 'Debe suministrar un correo',
  'email.email': 'Debe suministrar un correo',
  'email.regex': 'Debe suministrar un correo del dominio uninorte.edu.co',
  'password.required': 'Debe suministrar una clave',
  'password.min': 'La clave debe tener al menos 6 caracteres'
}

class UserController {
  async list ({ request }) {
    const { name, page } = request.get()

    let query = UserModel.query()

    if (name) {
      query = query.where('name', 'ilike', `${name}%`)
    }

    const dataSnapshot = await query.paginate(page)
    const data = dataSnapshot.toJSON()

    return data
  }

  async fetch ({ params, response }) {
    const { id } = params
    const data = await UserModel.find(id)
    return { data }
  }

  async fetchProjects ({ params, request, response }) {
    const user = await UserModel.find(params.id)
    const data = await user.projects().fetch()
    return { data }
  }

  async create ({ request, response }) {
    const payload = request.post()
    const rules = credentialRules
    const messages = credentialMessages
    const credentialFromEmail = await CredentialModel.findBy('email', payload.email)
    const validation = await validateAll(payload, rules, messages)

    if (validation.fails() || credentialFromEmail) {
      const errors = validation.messages() || []

      if (credentialFromEmail) {
        errors.push({
          field: 'email',
          validation: 'unique',
          message: 'El correo que ingreso ya esta registrado'
        })
      }

      response.status(400).send({ errors })
      return
    }

    const { name, description, email, password } = payload
    const user = await UserModel.create({ name, description })
    await user.credentials().create({ email, password })

    const data = await UserModel.find(user.id)

    return { data }
  }

  async update ({ params, request, response }) {
    const payload = request.post()
    const { id } = params
    const rules = profileRules
    const messages = profileMessages
    const validation = await validateAll(payload, rules, messages)

    if (validation.fails()) {
      const errors = validation.messages() || []
      response.status(400).send({ errors })
      return
    }

    const user = await UserModel.find(id)
    user.fill(payload)
    user.id = id
    await user.save()
    const data = await UserModel.find(id)

    return { data }
  }

  async getAvatat ({ params, response }) {
    const { id } = params
  }
}

module.exports = UserController

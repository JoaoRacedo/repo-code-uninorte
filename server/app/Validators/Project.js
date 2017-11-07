'use strict'

class Project {
  get rules () {
    return {
      name: 'required|string',
      description: 'required|string',
      tags: 'required|array',
      collaborators: 'array'
    }
  }
}

module.exports = Project

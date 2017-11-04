'use strict'

class Project {
  get rules () {
    return {
      name: 'required|string',
      description: 'required|string',
      tags: 'required|array',
      collaborators: 'required|array'
    }
  }
}

module.exports = Project

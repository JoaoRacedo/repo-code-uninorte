'use strict'

class ProjectRating {
  get rules () {
    return {
      stars: 'required|integer|above:0|under:6'
    }
  }
}

module.exports = ProjectRating

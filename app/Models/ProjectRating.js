'use strict'

const Model = use('Model')

class ProjectRating extends Model {
  static async updateRating (user, project, stars) {
    const { rows } = await ProjectRating
      .query()
      .where('user_id', user.id)
      .where('project_id', project.id)
      .fetch()

    let rating = rows[0] || null

    if (rating === null) {
      rating = new ProjectRating()
      rating.user_id = user.id
      rating.project_id = project.id
    }

    rating.stars = stars
    await rating.save()

    return rating
  }
}

module.exports = ProjectRating

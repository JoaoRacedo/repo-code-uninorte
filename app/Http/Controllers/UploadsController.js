'use strict'

const Helpers = use('Helpers')

class UploadsController {
  * test (request, response) {
    const file = request.file('file', {
      maxSize: '20mb'
    })

    // curl -F file=@/Users/sebastian/Pictures/photo.jpg http://localhost:3333/uploads
    yield file.move(Helpers.storagePath('uploads'), `1.${file.extension()}`)

    if (!file.moved()) {
      response.badRequest({ error: file.errors() })
    }

    response.ok({ message: 'File uploaded successfully' })
  }
}

module.exports = UploadsController

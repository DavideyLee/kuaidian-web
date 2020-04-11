var mock = require('../mock/file')
var uri = require('../../src/common/port_uri').port_file

module.exports = function (apiRouter) {
  //图片上传
  apiRouter.post(uri.image_upload, function (req, res) {
    setTimeout(function () {
      res.json(mock.image_upload)
    }, 1000)
  })
}

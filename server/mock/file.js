var Mock = require('mockjs')
var port_code = require('../../src/common/port_uri').port_code

exports.image_upload = Mock.mock({
  code: port_code.success,
  msg: "图片上传成功",
  data: {
    'id|10-100': 1,
    "name": "@ctitle",
    "image": "@image"
  }
})

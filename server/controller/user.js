var mock = require('../mock/user')
var uri = require('../../src/common/port_uri').port_user

module.exports = function (apiRouter) {
  //登录
  apiRouter.post(uri.login, function (req, res) {
    setTimeout(function () {
      res.json(mock.login)
    }, 1000)
  });
  //登出
  apiRouter.post(uri.logout, function (req, res) {
    setTimeout(function () {
      res.json(mock.logout)
    }, 1000)
  });
  //获取用户信息
  apiRouter.get(uri.info, function (req, res) {
    setTimeout(function () {
      res.json(mock.info)
    }, 1000)
  });
}

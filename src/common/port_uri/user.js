//获取用户信息
exports.info = process.env.API_URL + "/api/get/user/info"
//用户登录
exports.login = process.env.API_URL + "/api/login"
//用户登出
exports.logout = process.env.API_URL + "/api/logout"
//修改用户密码
exports.changepasswd = process.env.API_URL + "/api/changePasswd"
//用户注册
exports.register = process.env.API_URL + "/api/register"

exports.users = process.env.API_URL + "/api/get/user"
exports.usersProject = process.env.API_URL + "/api/get/user/project"

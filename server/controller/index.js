var express = require('express')
var apiRouter = express.Router()

require('./user')(apiRouter)
require('./table')(apiRouter)
require('./file')(apiRouter)

module.exports = apiRouter

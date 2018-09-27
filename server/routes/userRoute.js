const route = require('express').Router()
const isAuthorized = require('../middleware/isAuthorized')
const UserController = require('../controllers/UserController')

route.post('/login/email', UserController.loginEmail)
route.post('/login/username', UserController.loginUsername)
route.post('/check', isAuthorized , UserController.whoIsThis)
route.post('/create', UserController.create)

module.exports = route
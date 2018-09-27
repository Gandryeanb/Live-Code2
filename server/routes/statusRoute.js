const route = require('express').Router()
const isAuthorized = require('../middleware/isAuthorized')
const StatusController = require('../controllers/StatusController')

route.post('/', isAuthorized, StatusController.createStatus)
route.get('/', StatusController.getStatus)
route.get('/search/:description', StatusController.findSearch)

module.exports = route
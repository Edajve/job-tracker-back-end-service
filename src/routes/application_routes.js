const express = require('express')
const routes = express.Router()
const controller = require('../controllers/application_controller')

routes.get('/', controller.getAllApplications)
routes.get('/:id', controller.getApplicationById)
routes.post('/', controller.addApplication)
routes.put('/:id', controller.updateApplication)


module.exports = routes;
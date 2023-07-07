const express = require('express')
const routes = express.Router()
const controller = require('../controllers/application_controller')

routes.get('/', controller.getAllApplications)
routes.get('/query', controller.getApplicationsByCompanyName)
routes.get('/dynamic/query', controller.searchByJobSiteAndDynamicColumn)
routes.get('/:id', controller.getApplicationById)
routes.post('/', controller.addApplication)
routes.put('/:column/:id', controller.updateApplicationColumnByID)
routes.put('/:id', controller.updateApplication)
routes.delete('/:id', controller.deleteApplicationById)

module.exports = routes;
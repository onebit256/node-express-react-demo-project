const dashboard = require('express').Router()
const dashboard_controller = require('../Controller/dashboard.controller')

dashboard.get('/',dashboard_controller.main)
dashboard.get('/login',dashboard_controller.login)
dashboard.post("/uploadProfilePicture",dashboard_controller.upload_files) 

module.exports = dashboard
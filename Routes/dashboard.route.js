const dashboard = require('express').Router()
const dashboard_controller = require('../Controller/dashboard.controller')
const auth = require('../Middleware/auth')

dashboard.get('/', auth, dashboard_controller.main)
dashboard.get('/login',dashboard_controller.login)
dashboard.post('/login_form',dashboard_controller.login_form)
dashboard.get('/contract', auth, dashboard_controller.contract)
dashboard.post("/uploadProfilePicture", auth, dashboard_controller.upload_files) 

module.exports = dashboard
const dashboard = require('express').Router()
const login = require('../Controller/dashboard.controller')

dashboard.get('/',login.main)
dashboard.get('/login',login.login)

module.exports = dashboard
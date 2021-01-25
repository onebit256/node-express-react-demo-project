const db = require('../DBconnector/sqlit3_sequelize')
const bycrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");

async function main(req,res,next) {
  res.render('index');
}

//Login Controller
async function login(req,res,next){
  res.render('login');
}


module.exports = {
  main,
  login
}
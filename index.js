const createError = require("http-errors");
const express = require('express')
const mongoose = require('mongoose');
const router = require('./Routes/auth.route');
const dashboard = require('./Routes/dashboard.route');
const path = require("path");
const logger = require("morgan")
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require('body-parser');

var db = require("./DBconnector/sqlit3_sequelize");
var app = express();


// view engine setup
app.set("views", path.join(__dirname, "Views"));
console.log(1)
console.log(path.join(__dirname, "Views"))
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

//Routes

app.get('/testhello', function(req,res){
  res.render(index.html);
})
app.get('/test/:userId', function(req,res){
  const params = req.params;
  const o = 0;
  res.send(params['userId'])
})
app.use('/account/api',router)
app.use('/',dashboard)

//MongoDb connection
// mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});
// mongoose.connection.once('open',function(){
//   console.log('Database connected Successfully');
// }).on('error',function(err){
//   console.log('Error', err);
// })

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

//Server 
app.listen('8000',function(req,res){
  console.log('Serve is up and running at the port 8000')
})
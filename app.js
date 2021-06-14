var createError = require('http-errors');
var express = require('express');
var router = express.Router();
var path = require('path');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
var cors = require('cors'); // CORS middleware
//const DB = require('./conf/db');
//const db = new DB("sqlitedb")
//const config = require('./conf/config');
//const jwt = require('jsonwebtoken');

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/js', express.static(__dirname + '/node_modules/vue/dist/'));      // Include Vue js
app.use('/', express.static(__dirname + '/node_modules/bootstrap/dist/'));  // Include bootstrap

app.use('/', require('./routes/masterroutes'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');

var indexRouter = require('./routes/index');
var APIRouter = require("./routes/api");
var filesRouter = require("./routes/filesrouter");
var videoRouter = require("./routes/videoRouter");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// Include Vue js
app.use('/js', express.static(__dirname + '/node_modules/vue/dist/'));
app.use('/', express.static(__dirname + '/node_modules/bootstrap/dist/'));


app.use('/', indexRouter);
app.use("/api", APIRouter);
app.use("/files", filesRouter);
app.use("/video", videoRouter);

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

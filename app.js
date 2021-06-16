var createError = require('http-errors');
var express = require('express');
var router = express.Router();
var path = require('path');
var app = express();
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var favicon = require('serve-favicon')
const DB = require('./modules/db');
const db = new DB("sqlitedb.db")

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
var cors = require('cors'); // CORS middleware

app.use(cors())
app.use(favicon(path.join(__dirname, 'public', 'res', 'favicon.ico')))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/js', express.static(__dirname + '/node_modules/vue/dist/'));      // Include Vue js
app.use('/', express.static(__dirname + '/node_modules/bootstrap/dist/'));  // Include bootstrap
app.use('/js', express.static(__dirname + '/node_modules/crypto-js/')); // Include crypto js

app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());
passport.use(new Strategy(
  function(username, password, cb) {
    db.selectByName(username, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (user.password != password) { return cb(null, false); }
      return cb(null, user);
  });
}));

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  db.selectById(id, function (err, user) {
      if (err) { return cb(err); }
      cb(null, user);
  });
});

app.get("/login", (req, res) => res.render('login'))
app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login?bad=1' }),
  function(req, res) {
    res.redirect('/');
  });
app.use('/', require('connect-ensure-login').ensureLoggedIn(), require('./routes/masterroutes'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  console.log(err.message)
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

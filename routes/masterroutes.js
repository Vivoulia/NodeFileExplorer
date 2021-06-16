var express = require('express');
var router = express.Router();
const auth = require('../conf/auth');
var createError = require('http-errors');

var files = require('./files')
var video = require('./video')
var index = require('./index')
var api = require('./api')
var admin = require('./admin')

router.get("/", index)
router.get("/explorer", index)
router.post("/api/files*", api)
router.get("/files/*", files)
router.get("/video/*", video)
router.get("/admin", requireAdmin(), admin)

function requireAdmin() {
    return function(req, res, next) {
        auth.findByUsername(req.user.name, function(err, user) {
            console.log(user)
            if (err) { next(createError(404)); }
            if (!user.admin) { next(createError(401)); }
            next();
        });
    }
  }


module.exports = router;

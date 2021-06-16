var express = require('express');
var router = express.Router();
const DB = require('../modules/db');
const db = new DB("sqlitedb.db")
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
router.get("/admin", requireAdmin(), admin.get)
router.post("/admin", requireAdmin(), admin.post)

function requireAdmin() {
    return function(req, res, next) {
        db.selectByName(req.user.name, function(err, user) {
            if (err) { next(createError(404)); }
            if (!user.admin) { next(createError(401)); }
            next();
        });
    }
  }

module.exports = router;

var express = require('express');
var router = express.Router();

var files = require('./files')
var video = require('./video')
var index = require('./index')
var api = require('./api')

var cb0 = function (req, res, next) {
    console.log('CB0');
    next();
  }

router.get("/", index)
router.post("/api/files*",  [cb0, api])
router.get("/files/*", files)
router.get("/video/*", video)

module.exports = router;

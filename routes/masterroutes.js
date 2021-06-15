var express = require('express');
var router = express.Router();

var files = require('./files')
var video = require('./video')
var index = require('./index')
var api = require('./api')

router.get("/", index)
router.get("/explorer", index)
router.post("/api/files*", api)
router.get("/files/*", files)
router.get("/video/*", video)

module.exports = router;

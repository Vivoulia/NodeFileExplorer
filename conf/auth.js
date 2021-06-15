var express = require('express');
var router = express.Router();
const DB = require('../conf/db');
const db = new DB("sqlitedb.db")

var auth = {
    findById: function (id, cb) {
      db.selectById(id, cb)
    }, 

    findByUsername: function (username, cb) {
      db.selectByName(username, cb)
    }
}

module.exports = auth;

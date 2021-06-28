const DB = require('../modules/db');
const db = new DB("sqlitedb.db")

var admin = {
  get: function (req, res, next) {
    res.render('admin', {usercreated: "0"});
  },
  post: function (req, res, next) {
    const username = req.body.username;
    const password = req.body.password;
    const admin = req.body.admin == "on";

    db.selectByName(username, function(err, user) {
      if (!user) {
        db.insert(username, password, admin, function(err, user) {
          if (err) { res.render('admin', {usercreated: "2"}); }
          res.render('admin', {usercreated: "1"});
        })
      }
      else{
        db.modify(username, password, admin, function(err, user) {
          if (err) { res.render('admin', {usercreated: "2"}); }
          res.render('admin', {usercreated: "3"});
        })
      }
    })


  }
}

module.exports = admin;

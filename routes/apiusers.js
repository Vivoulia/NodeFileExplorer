const basedir = process.env.FOLDER || "share";
const maxdepth = process.env.MAXFOLDER || 100;
const fs = require('fs');
const DB = require('../modules/db');
const db = new DB("sqlitedb.db")

function apiusers(req, res) {
  const requestdir = req.body;
  console.log(requestdir)
  if(req.body.run == "listall"){
      db.selectAll(function(err, rows){
        var rowsclear = []

        for (let index = 0; index < rows.length; index++) {
          const element = rows[index];
          rowsclear.push({"name" : element.name, "admin" : element.admin})
        }
        var jsonfiles = {"listusers": rowsclear};
        res.status(200).json(jsonfiles)
    })
  }
  else if(req.body.run == "remove"){
    db.removeByName(req.body.username, function(err){
      if(err){
        console.log(err)
        res.status(500).send()
      }
      else{
        res.status(200).send()
      }
    })
  }
  else if(req.body.run == "add"){

    const username = req.body.username;
    const password = req.body.password;
    const admin = req.body.admin == "true";

    db.selectByName(username, function(err, user) {
      if (!user) {
        db.insert(username, password, admin, function(err, user) {
          if (err) { res.status(500).send() }
          res.status(200).json({"state": "created"})
        })
      }
      else{
        db.modify(username, password, admin, function(err, user) {
          if (err) { res.status(500).send() }
          res.status(200).json({"state": "modified"})
        })
      }
    })
  }
};

module.exports = apiusers;

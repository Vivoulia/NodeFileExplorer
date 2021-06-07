var express = require('express');
var router = express.Router();
const basedir = process.env.FOLDER || ".";
const fs = require('fs');

/* GET API. */
router.get("/", function(req, res) {
  res.send("API is working properly");
});

router.get("/files", function(req, res) {
  var jsonfiles = {
    "listfiles": []
  };

  new Promise((resolve, reject) => {
    return fs.readdir(basedir, (err, filenames) => err != null ? reject(err) : resolve(filenames))
  }).then((filenames) => {
    filenames.forEach(file => {
      jsonfiles.listfiles.push({
        "name" : file,
        "url" : "/files/" + file
        })
      console.log(file);
    })
    res.status(200).json(jsonfiles)
  })
});

module.exports = router;

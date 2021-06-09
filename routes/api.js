var express = require('express');
var router = express.Router();
const basedir = process.env.FOLDER || ".";
const fs = require('fs');

/* GET API. */
router.get("/", function(req, res) {
  res.send("API is working properly");
});

router.get("/files*", function(req, res) {
  console.log(req.params[0])
  const dir = basedir + "/" + req.params[0];
  var jsonfiles = {"listfiles": []};
  new Promise((resolve, reject) => {
    return fs.readdir(dir, (err, filenames) => err != null ? reject(err) : resolve(filenames))
  }).then((filenames) => {
    filenames.forEach(file => {
      jsonfiles.listfiles.push({
        "name" : file,
        "url"  : dir + "/" + file,
        "file" : fs.lstatSync(dir + "/" + file).isFile(),
        "type" : type(file)
        })
    })
    res.status(200).json(jsonfiles)
  })
});

function type(filename){
  var parts = filename.split('.');
  var extension = parts[parts.length - 1];

  switch (extension.toLowerCase()) {
    case 'm4v':
    case 'avi':
    case 'mpg':
    case 'mp4':
    case 'mkv':     // mkv work only with chrome
      return "video";
  }
  switch (extension.toLowerCase()) {
    case 'jpg':
    case 'gif':
    case 'bmp':
    case 'png':
      return "image";
  }
  return "other"
}

module.exports = router;

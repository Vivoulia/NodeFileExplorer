const basedir = process.env.FOLDER || ".";
const fs = require('fs');

function api(req, res) {
  const requestdir = req.body.dir;  

  var dir = basedir;
  for (let index = 0; index < requestdir.length; index++) {
    if(requestdir[index] != ".."){
      dir = dir + "/" + requestdir[index];
    }
  }
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
  }).catch((error) => {
    console.error(error);
    res.status(423).send({
      message: "Error accessing the folder.",
    });
  })
};

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

module.exports = api;

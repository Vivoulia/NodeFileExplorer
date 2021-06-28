const basedir = process.env.FOLDER || "share";
const fs = require('fs');

function files(req, res) {
  const fileName = req.params[0];
  const directoryPath = basedir + "/";
  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
};

module.exports = files
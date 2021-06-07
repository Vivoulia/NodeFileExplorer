var express = require('express');
var router = express.Router();
const basedir = process.env.FOLDER || ".";
const fs = require('fs');

router.get("/:name", function(req, res) {
  const fileName = req.params.name;
  const directoryPath = basedir + "/";
  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
});


module.exports = router;

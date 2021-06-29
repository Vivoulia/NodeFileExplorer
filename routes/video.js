const basedir = process.env.FOLDER || "share";
const fs = require('fs');
const sanitize = require("sanitize-filename");

function video(req, res) {
    const filePath = req.params[0];
    const directoryPath = basedir + "/";
    // Ensure there is a range given for the video
    const range = req.headers.range;
    if (!range) {
    res.status(400).send("Requires Range header");
    }

    // Sanitize filename
    var filePathSanatized = ""
    const filePathtab = filePath.split("/")
    for (let index = 0; index < filePathtab.length - 1; index++) {
        filePathSanatized = filePathSanatized + sanitize(filePathtab[index]) + "/";        
    }
    filePathSanatized = filePathSanatized + sanitize(filePathtab[filePathtab.length-1], ".")

    // get video stats
    const videoPath = directoryPath + filePathSanatized;
    const videoSize = fs.statSync(videoPath).size;

    
    // Parse Range
    // Example: "bytes=32324-"
    const CHUNK_SIZE = 10 ** 6; // 1MB
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
    // Create headers
    const contentLength = end - start + 1;
    const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
    };

    // HTTP Status 206 for Partial Content
    res.writeHead(206, headers);

    // create video read stream for this particular chunk
    const videoStream = fs.createReadStream(videoPath, { start, end });

    // Stream the video chunk to the client
    videoStream.pipe(res);
};


module.exports = video;

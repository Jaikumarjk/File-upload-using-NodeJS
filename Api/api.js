const express = require('express');         // Express Web Server
const busboy = require('connect-busboy');
const path = require('path');               // Used for manipulation with path
const fs = require('fs-extra');             // Classic fs
const router = express.Router();
router.use(busboy({
    highWaterMark: 2 * 1024 * 1024, // Set 2MiB buffer
})); // Insert the busboy middle-ware
/**
 * Create route /upload which handles the post request
 */

router.route('/').post((req, res, next) => {
var time = new Date().getTime()
var year = new Date().getFullYear()
var folder = 'upload/'+time+year.toString()
var uploadPath = path.join(__dirname, folder); // Register the upload path
fs.ensureDir(uploadPath); // Make sure that he upload path exits
req.pipe(req.busboy); // Pipe it trough busboy
   
		
req.busboy.on('file', (fieldname, file, filename) => {
		
        console.log(`Upload of '${filename}' started`);

        // Create a write stream of the new file
        const fstream = fs.createWriteStream(path.join(uploadPath, filename));
        // Pipe it trough
        file.pipe(fstream);

        // On finish of the upload
        fstream.on('close', () => {
            console.log(`Upload of '${filename}' finished`);
			
        });
		
  })
res.send("uploaded successfully");  
})

module.exports = router;

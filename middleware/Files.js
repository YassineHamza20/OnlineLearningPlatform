const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();

router.use('/api/uploads', (req, res, next) => {
    const role = req.query.role;
    const fileType = req.query.fileType;
    const id = req.query.id;
    const fileName = req.path.split('/').pop(); // Get the file name from the request path

    // Construct the absolute path
    const dirPath = path.join(__dirname, '..', 'uploads', fileType, role, id);
    const filePath = path.join(dirPath, fileName);

    // Log the paths for debugging
    console.log('Directory Path:', dirPath);
    console.log('File Path:', filePath);

    // Check if the directory exists and is readable
    fs.access(dirPath, fs.constants.R_OK, (err) => {
        if (err) {
            console.error('Directory not accessible:', dirPath);
            return res.status(404).json({ message: 'Directory not found or inaccessible' });
        }

        // Check if the file exists and is readable
        fs.access(filePath, fs.constants.R_OK, (err) => {
            if (err) {
                console.error('File not accessible:', filePath);
                return res.status(404).json({ message: 'File not found or inaccessible' });
            }

            // Serve the static file
            res.sendFile(filePath);
        });
    });
});

module.exports = router;

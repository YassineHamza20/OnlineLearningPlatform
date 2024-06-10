// middleware/fileUploads.js

const multer = require('multer');
const path = require('path');
const fs = require('fs')
const deleteExistingFileFromDB = require('./deleteFile'); // Import the new middleware


// Multer configuration for images and videos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Get the user ID and role from the request object
        const userId = req.user.id;
        const userRole = req.user.role;
        console.log("body: ", req.body);
        
        // Determine the directory based on file type
        let directory;
        if (file.mimetype.startsWith('image')) {
            directory = `./uploads/images/${req.user.role}/${userId}`;
            deleteExistingFileFromDB(userId, userRole, "image", directory)
        } else if (file.mimetype.startsWith('video')) {
            directory = `./uploads/videos/${req.user.role}/${userId}`;
            deleteExistingFileFromDB(userId, userRole, "video", directory)
        } else if (file.mimetype === 'application/pdf') {
            directory = `./uploads/courses/tutor/${userId}`
        } else {
            return cb({ message: 'Unsupported file type' }, false);
        }

        // Create the directory if it doesn't exist
        fs.mkdirSync(directory, { recursive: true });

        // Set the destination directory
        cb(null, directory);
    },
    filename: (req, file, cb) => {
        const fileName = Date.now() + path.extname(file.originalname);
        cb(null, fileName);
    }
});

const upload = multer({ storage: storage });

module.exports = upload;

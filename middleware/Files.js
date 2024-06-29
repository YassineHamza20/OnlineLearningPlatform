const express = require('express');
const path = require('path');
const router = express.Router();

router.use('/api/uploads', (req, res, next) => {
    const role = req.query.role;
    const fileType = req.query.fileType;
    const id = req.query.id;

    // Construct the absolute path
    const dirPath = path.join(__dirname, '..', 'uploads', fileType, role, id);

    // Serve static files from the constructed path
    express.static(dirPath)(req, res, next);
});

module.exports = router;

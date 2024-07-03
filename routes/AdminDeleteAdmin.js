const express = require('express');
const router = express.Router();
const mysql = require('../helpers/Sql_connection');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');
const deleteExistingFileFromDB = require('../middleware/deleteFile');

router.post('/DeleteAdminAccount', auth, roleCheck(["Admin"]), (req, res) => {
    const { userId } = req.body;

    const directory = `./uploads/images/Admin/${userId}`;
    deleteExistingFileFromDB(userId, "Administrator", "image", directory);
    const query = `DELETE FROM administrator WHERE id = ?`;

    mysql.query(query, [userId], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ message: "Internal Server Error" });
        } else {
            res.status(204).json({ message: "Deleted" });
        }
    });
});

module.exports = router;

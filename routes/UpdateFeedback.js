const express = require('express');
const router = express.Router();
const mysql = require('../helpers/Sql_connection');

router.post('/updatefeedback', (req, res) => {
    const { feedbackId } = req.body;  // Expects the ID of the feedback to be provided

    // First, fetch the current state of the feedback
    const getStateQuery = `SELECT feedback_state FROM feedback WHERE feedback_id = ?`;

    mysql.query(getStateQuery, [feedbackId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Internal Server Error", error: err });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "Feedback not found" });
        }

        // Determine the new state based on the current state
        const currentState = results[0].feedback_state;
        const newState = currentState === 0 ? 1 : 0;

        // SQL query to update feedback state in the database
        const updateQuery = `UPDATE feedback SET feedback_state = ? WHERE feedback_id = ?`;

        mysql.query(updateQuery, [newState, feedbackId], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Internal Server Error", error: err });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Feedback not found" });
            } else {
                return res.status(200).json({ message: `Feedback state updated to ${newState === 1 ? 'verified' : 'unverified'}` });
            }
        });
    });
});

module.exports = router;

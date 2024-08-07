const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const mysql = require('../helpers/Sql_connection');
// auth, 

// Endpoint to post general website feedback
router.post('/Feedback', (req, res) => {
    const { learnerId, feedbackText } = req.body;  // expects learnerId and feedbackText in the request body

    // SQL query to insert new feedback into the database
    const query = `INSERT INTO feedback (learner_id, feedback_text, feedback_state) VALUES (?, ?, 0)`;

    mysql.query(query, [learnerId, feedbackText], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: "Internal Server Error", error: err });
        } else {
            res.status(200).json({ message: "Feedback submitted successfully", feedbackId: result.insertId });
        }
    });
});

module.exports = router;

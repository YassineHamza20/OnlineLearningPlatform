const express = require('express');
const router = express.Router();
const mysql = require('../helpers/Sql_connection');
 
//auth, roleCheck(["Admin"]),
// GET endpoint to retrieve all feedback entries// Assuming the table where learner data is stored is named 'users'
router.post('/getAllFeedback', (req, res) => {
    const query = `
        SELECT f.feedback_id, u.firstname, u.lastname, f.feedback_text, f.feedback_state
        FROM feedback f
        JOIN learner u ON f.learner_id = u.id;`;

    mysql.query(query, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: "Internal Server Error", error: err });
        } else {
            const enhancedResults = results.map(feedback => ({
                ...feedback,
                isAlreadyVerified: feedback.feedback_state === 1  // Adding a new property to indicate verification status
            }));
            if (results.length > 0) {
                res.status(200).json({
                    message: "Feedback retrieved successfully",
                    feedback: enhancedResults
                });
            } else {
                res.status(404).json({ message: "No feedback found" });
            }
        }
    });
});

module.exports = router;



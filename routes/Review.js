const express = require('express');
const router = express.Router();
const connection = require('../helpers/Sql_connection'); // Adjust the path to your db connection file

// Add a new review
router.post('/review', (req, res) => {
    const { learner_id, tutor_uuid, review } = req.body;

    if (!learner_id || !tutor_uuid || !review) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    const sql = 'INSERT INTO reviews (learner_id, tutor_uuid, review) VALUES (?, ?, ?)';

    connection.query(sql, [learner_id, tutor_uuid, review], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ message: 'You have already reviewed this tutor.' });
            }
            return res.status(500).json({ message: 'Database error', error: err });
        }
        res.status(201).json({ message: 'Review added successfully!' });
    });
});

// Get reviews for a tutor
// Get reviews for a tutor
router.get('/review/:uuid', (req, res) => {
    const tutor_uuid = req.params.uuid;
    const sql = `
        SELECT 
            r.review, 
            r.created_at, 
            l.firstname AS learner_name, 
            l.lastname AS learner_lastname, 
            l.pfp AS pic, 
            l.country 
        FROM 
            reviews r 
        JOIN 
            learner l 
        ON 
            r.learner_id = l.id 
        WHERE 
            r.tutor_uuid = ?
    `;

    connection.query(sql, [tutor_uuid], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }
        res.json(results);
    });
});


module.exports = router;

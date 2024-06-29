const express = require('express');
const router = express.Router();
const mysql = require('../helpers/Sql_connection');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');
const { formatTime } = require('../helpers/Functions');
//, auth, roleCheck(["Learner"])
router.post('/getFreeTutors', (req, res) => {
    const {
        selectedDate,
        lessonLength,
        lessonTopic, 
        Language
    } = req.body;

    console.log('Request Body:', req.body);

    if (!selectedDate || !lessonLength || !lessonTopic || !Language) {
        return res.status(400).json({ message: "Bad Data!" });
    }

    let formattedBeginDate, formattedEndDate;
    try {
        ({ formattedBeginDate, formattedEndDate } = formatTime(selectedDate, lessonLength));
        console.log('Formatted Dates:', { formattedBeginDate, formattedEndDate });
    } catch (error) {
        console.error('Error formatting time:', error.message);
        return res.status(500).json({ message: "Error formatting time" });
    }

    const query = `
        SELECT id, email, pfp, lastname, firstname, Country, description 
        FROM tutor 
        WHERE id NOT IN (
            SELECT t.id
            FROM private_lesson AS pl
            JOIN tutor AS t ON t.id = pl.tutor_id
            WHERE (
                (pl.start_time >= ? AND pl.start_time <= ?)
                OR (pl.end_time >= ? AND pl.end_time <= ?)
                OR (pl.start_time <= ? AND pl.end_time >= ?)
            ) AND pl.Accepted <> 0
            GROUP BY t.id
        )
        AND (
            (education LIKE CONCAT('%', ?, '%'))
            OR (workexperience LIKE CONCAT('%', ?, '%'))
        )
        AND (Languages LIKE CONCAT('%', ?, '%'))
    `;

    const queryParams = [
        formattedBeginDate, 
        formattedEndDate, 
        formattedBeginDate, 
        formattedEndDate, 
        formattedBeginDate,
        formattedEndDate,
        lessonTopic,
        lessonTopic,
        Language
    ];

    console.log('Query Params:', queryParams);

    mysql.query(query, queryParams, (err, result) => {
        if (err) {
            console.error('SQL Error:', err);
            return res.status(500).json({ message: "Internal Server Error" });
        } else {
            console.log('Query Result:', result);
            return res.status(200).json({ message: result });
        }
    });
});

module.exports = router;

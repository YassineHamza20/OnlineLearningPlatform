const express = require('express');
const router = express.Router();
const mysql = require('../helpers/Sql_connection');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');
const { formatTime } = require('../helpers/Functions');

router.post('/getFreeTutors', auth, roleCheck(["Learner"]), (req, res) => {
    const {
        selectedDate,
        lessonLength,
        lessonTopic, 
        Language
    } = req.body;

    console.log(req.body);

    if (!selectedDate || !lessonLength || !lessonTopic || !Language) {
        res.status(400).json({ message: "Bad Data!" });
        return; // return to avoid further execution if data is missing
    }

    let formattedBeginDate, formattedEndDate;
    try {
        const result = formatTime(selectedDate, lessonLength);
        formattedBeginDate = result.formattedBeginDate;
        formattedEndDate = result.formattedEndDate;
    } catch (error) {
        console.log('Error formatting time:', error);
        res.status(500).json({ message: "Error formatting time" });
        return;
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
        AND (JSON_CONTAINS(education, ?, '$') = 1
            OR JSON_CONTAINS(workexperience, ?, '$') = 1)
        AND (JSON_CONTAINS(Languages, ?, '$') = 1)
    `;

    mysql.query(query, [
        formattedBeginDate, 
        formattedEndDate, 
        formattedBeginDate, 
        formattedEndDate, 
        formattedBeginDate,
        formattedEndDate,
        JSON.stringify({ tag: lessonTopic }),
        JSON.stringify({ tag: lessonTopic }),
        JSON.stringify({ language: Language })
    ], (err, result) => {
        if (err) {
            console.log('SQL Error:', err);
            res.status(500).json({ message: "Internal Server Error" });
        } else {
            console.log('Query Result:', result);
            res.status(200).json({ message: result });
        }
    });
});

module.exports = router;

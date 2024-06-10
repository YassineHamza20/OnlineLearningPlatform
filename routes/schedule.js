const express = require('express');
const router = express.Router();
const mysql = require('../helpers/Sql_connection');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');
const {formatTime} = require('../helpers/Functions')
const { v4: uuidv4 } = require('uuid');
const isSubscribed = require('../middleware/checkSubscription');

router.post('/scheduleLesson', auth, roleCheck(["Learner"]), isSubscribed, (req, res) => {
    //generating unique key for lesson
    const uuid = uuidv4()

    const userId = req.user.id;
    const {
        tutorId,
        lessonTopic,
        lessonDifficulty,
        selectedDate, // format: mm/dd/yyyy 
        lessonLength,
        lessonLanguage
    } = req.body;

    console.log(req.body)

    if (!tutorId || !lessonTopic || !lessonDifficulty || !selectedDate || !lessonLength || !lessonLanguage) {
        res.status(400).json({ message: "Bad Data!" });
        return; // return to avoid further execution if data is missing
    }

    const {formattedBeginDate, formattedEndDate} = formatTime(selectedDate, lessonLength) 

    console.log("formattedEndDate: ", formattedEndDate);
    console.log("beginDate: ", formattedBeginDate);

    
    // Prepare and execute the SQL query
    const query = "INSERT INTO private_lesson(tutor_id, private_learner_id, start_time, end_time, lesson_topic, lesson_difficulty, duration, Accepted, language, ReadByTutor, ReadByLearner, uuid) VALUES(?, ?, ?, ?, ?, ?, ?, -1, ?, 0, 0, ?)";
    mysql.query(query, [tutorId, userId, formattedBeginDate, formattedEndDate, lessonTopic, lessonDifficulty, lessonLength, lessonLanguage, uuid], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ message: "Internal Server Error" });
        } else {
            res.status(200).json({lesson_id: result.insertId, start_time: formattedBeginDate, end_time: formattedEndDate}); // Assuming you want to return the result of the query
        }
    })
});

module.exports = router;

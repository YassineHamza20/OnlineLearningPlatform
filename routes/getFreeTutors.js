//this api is for getting the tutors that are free to teach in a given date 
const express = require('express')
const router = express.Router()
const mysql = require('../helpers/Sql_connection')
const auth = require('../middleware/auth')
const roleCheck = require('../middleware/roleCheck')
const {formatTime} = require('../helpers/Functions')

//, auth, roleCheck(["Learner"]),
router.post('/getFreeTutors', (req, res) => {
    const {
        selectedDate,
        lessonLength,
        lessonTopic, 
        Language
    } = req.body

    console.log(req.body);

    if(!selectedDate || !lessonLength || !lessonTopic || !Language) {
        res.status(400).json({ message: "Bad Data!" });
        return; // return to avoid further execution if data is missing
    }

    const {formattedBeginDate, formattedEndDate} = formatTime(selectedDate, lessonLength) 

    

    const query = `select id, email, pfp, lastname, firstname, Country, description from tutor where id not in (
        SELECT t.id
        FROM private_lesson as pl, tutor as t
        WHERE (
           (pl.start_time >= ? AND pl.start_time <= ?)
            OR (pl.end_time >= ? AND pl.end_time <= ?)
            OR (pl.start_time <= ? AND pl.end_time >= ?)	
        ) AND t.id = pl.tutor_id 
        AND pl.Accepted <> 0
            Group by(t.id)
        )
        AND  (JSON_CONTAINS(education, ?, '$') = 1
        OR JSON_CONTAINS(workexperience, ?, '$') = 1)
        AND (JSON_CONTAINS(Languages, ?, '$') = 1)
        `
    
    mysql.query(query, [
        formattedBeginDate, 
        formattedEndDate, 
        formattedBeginDate, 
        formattedEndDate, 
        formattedBeginDate,
        formattedEndDate,
        JSON.stringify({ tag: lessonTopic }),
        JSON.stringify({ tag: lessonTopic }),
        JSON.stringify({ language: Language})
    ], (err, result) => {
        if(err) {
            console.log(err)
            res.status(500).json({message: "Internal Server Error"})
        }else {
            console.log(result)
            res.status(200).json({message: result})
        }
    } )

})

module.exports = router
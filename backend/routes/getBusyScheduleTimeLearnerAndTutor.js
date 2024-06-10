const express = require('express')
const router = express.Router()
const mysql = require('../helpers/Sql_connection')
const auth = require('../middleware/auth')
const roleCheck = require('../middleware/roleCheck')


router.post('/getTutorAndLearnerBusyTimes', auth, roleCheck(["Learner"]), (req, res) => {
    const {
        selectedDate, tutorId
    } = req.body

    if(!selectedDate || !tutorId){
        res.status(400).json({ message: "Bad Data!" });
        return // to avoid further execution when data missing 
    }

    const userId = req.user.id;

    console.log(selectedDate)

    const month = selectedDate.split('/')[0]
    const day = selectedDate.split('/')[1]
    const year = selectedDate.split('/')[2]


    const formattedTime = `${year}-${month}-${day}`

    console.log(formattedTime);
    
    // Generate 15-minute increments between start_time and end_time for the specified date
    const query = `
    WITH RECURSIVE time_intervals AS (
        SELECT start_time as interval_time, end_time
        FROM private_lesson 
        where (tutor_id = ?
            or private_learner_id = ?)
        and Date(start_time) = ?
        and Date(start_time) >= Now()
        and Accepted <> 0
        UNION ALL
        SELECT ADDTIME(interval_time, '00:15:00'), end_time
        FROM time_intervals
        WHERE ADDTIME(interval_time, '00:15:00') <= end_time
    )
    SELECT DATE_FORMAT(interval_time, '%Y-%m-%d %H:%i') AS interval_time_formatted
    FROM time_intervals;

    `

    mysql.query(query, [tutorId, userId, formattedTime], (err, result) => {
        if(err) {
            console.log(err)
            res.status(500).json({message: "Internal Server Error"})
        }else {
            console.log(result)
            res.status(200).json({message: result})
        }
    })
})

module.exports = router
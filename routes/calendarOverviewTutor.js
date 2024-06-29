const express = require('express')
const router = express.Router()
const mysql = require('../helpers/Sql_connection')
const auth = require('../middleware/auth')
const roleCheck = require('../middleware/roleCheck')

//auth, roleCheck(["Tutor"]),
router.post('/getFirstLesson',  (req, res) => {
  //  const userId = req.user.id
    const userId = req.body.id
    //getting only the first lessons for the next 6 days
    const query = `SELECT *
    FROM private_lesson AS t1
    WHERE start_time = (
        SELECT MIN(start_time)
        FROM private_lesson AS t2
        WHERE DATE(t2.start_time) = DATE(t1.start_time)
        AND t2.start_time >= NOW()
        AND tutor_id = ?
        AND t2.Accepted = 1
    )
    AND t1.Accepted = 1;`

    //query that gets lessons within the next 7 days 
    /*SELECT *
    FROM private_lesson AS t1
    WHERE start_time = (
        SELECT MIN(start_time)
        FROM private_lesson AS t2
        WHERE DATE(t2.start_time) = DATE(t1.start_time)
        AND t2.start_time >= NOW()
        AND t2.start_time < NOW() + INTERVAL 7 DAY
        AND tutor_id = ?
        AND t2.Accepted = 1
    )
    AND t1.Accepted = 1;*/

    mysql.query(query, [userId], (err, result) => {
        if(err) {
            console.log(err)
            res.status(500).json({message:"Internal Server Error"})
        }else {
            res.status(200).json({message: result})
        }
    })


})

module.exports = router
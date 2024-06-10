const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const roleCheck = require('../middleware/roleCheck')
const mysql = require('../helpers/Sql_connection')


router.post('/getCourseInfo', auth, roleCheck(["Learner"]), (req, res)=> {

    const {
        courseUuid
    } = req.body

    //getting courses information
    const query = `SELECT course.*, t.firstname, t.lastname, t.uuid, t.Country, t.pfp, t.created_at as tutorJoined
    FROM course, tutor as t
    where course.tutorId = t.id
    and course.uuid =?`

    mysql.query(query, [courseUuid], (err, result) => {
        if(err) {
            console.log(err);
            res.status(500).json({message: "Internal Server Error"})
        }else{
            res.status(200).json({result: result[0]})
        }
    })  
})

module.exports = router
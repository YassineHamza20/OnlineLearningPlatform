const express = require('express')
const router = express.Router()
const mysql = require('../helpers/Sql_connection')
const auth = require('../middleware/auth')
const roleCheck = require('../middleware/roleCheck')


router.post('/markAllAsRead', auth, roleCheck(["Tutor"]), (req, res) => {
    const tutorId = req.user.id

    const query = `update private_lesson
    set ReadByTutor = 1 
    where tutor_id = ? and ReadByTutor = 0;`

    mysql.query(query, [tutorId], (err, result) => {
        if(err) {
            console.log("MarkAllAsRead for tutor error: ", err)
            res.status(500).json({message: "Internal Server Error"})
        }else {
            console.log("all read for tutor");
            res.status(201).json({message: "Marked As Read !"})
        }
    })
})

module.exports = router
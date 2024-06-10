const express = require('express')
const router = express.Router()
const mysql = require('../helpers/Sql_connection')
const auth = require('../middleware/auth')
const roleCheck = require('../middleware/roleCheck')


router.post('/markAllAsRead', auth, roleCheck(["Learner"]), (req, res) => {
    const tutorId = req.user.id

    const query = `update private_lesson
    set ReadByLearner = 1 
    where private_learner_id = ? and ReadByLearner = 0;`

    mysql.query(query, [tutorId], (err, result) => {
        if(err) {
            console.log("MarkAllAsRead for tutor error: ", err)
            res.status(500).json({message: "Internal Server Error"})
        }else {
            console.log("all read for learner");
            res.status(201).json({message: "Marked As Read !"})
        }
    })
})

module.exports = router
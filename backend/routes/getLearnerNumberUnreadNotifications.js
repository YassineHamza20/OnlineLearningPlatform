const express = require('express')
const router = express.Router()
const mysql = require('../helpers/Sql_connection')
const auth = require('../middleware/auth')
const roleCheck = require('../middleware/roleCheck')


router.post('/CountUnreadNotifications', auth, roleCheck(["Learner"]), (req, res)=> {
    const userId = req.user.id


    //getting number of unread messages
    const query = `SELECT Count(ReadByLearner) as length
    from private_lesson
    where private_learner_id = ? and readByLearner = 0;`

    mysql.query(query, [userId], (err, result) => {
        if(err) {
            console.log(err)
            res.status(500).json({message: "Internal Server Error"})
        }else {
            res.status(200).json({unreadNotifs: result[0].length})
        }
    })
})

module.exports = router
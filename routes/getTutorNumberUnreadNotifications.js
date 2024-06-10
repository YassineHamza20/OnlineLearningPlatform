const express = require('express')
const router = express.Router()
const mysql = require('../helpers/Sql_connection')
const auth = require('../middleware/auth')
const roleCheck = require('../middleware/roleCheck')


router.post('/CountUnreadNotifications', auth, roleCheck(["Tutor"]), (req, res)=> {
    const userId = req.user.id


    //getting number of unread messages
    const query = `SELECT Count(ReadByTutor ) as length
    from private_lesson
    where tutor_id = ? and readByTutor = 0;`

    mysql.query(query, [userId], (err, result) => {
        if(err) {
            console.log(err)
            res.status(500).json({message: "Internal Server Error"})
        }else {
            console.log(result[0]);
            res.status(200).json({unreadNotifs: result[0].length})
        }
    })
})

module.exports = router
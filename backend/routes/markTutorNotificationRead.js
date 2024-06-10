const express = require('express')
const router = express.Router()
const mysql = require('../helpers/Sql_connection')
const auth = require('../middleware/auth')
const roleCheck = require('../middleware/roleCheck')



router.post('/markAsRead', auth, roleCheck(["Tutor"]), (req, res) => {
    const {
        notificationId,
        notificationType
    } = req.body



    const query = `update private_lesson 
    set ReadByTutor = 1 
    where lesson_id = ?`

    mysql.query(query, [notificationId], (updateErr, updateResult) => {
        if (updateErr) {
            console.log(updateErr)
            res.status(500).json({message: "Internal Server Error"})
        }else {
            res.status(200).json({message: "Notification Read successfully "})
        }
    })

})

module.exports = router
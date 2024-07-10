const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const roleCheck = require('../middleware/roleCheck')
const mysql = require('../helpers/Sql_connection')



 
router.post('/Revenue', auth, roleCheck(["Tutor"]), (req, res) => {
    const userId= req.user.id
    const query = `select * from private_lesson where
    tutor_id = ? and accepted = 1 and end_time < NOW()`
    mysql.query(query, [userId], (err, result) => {
        if(err) {
            console.log(err)
            res.status(500).json({message: "Internal Server Error"})
        }else {
            let Revenue = 0
            result.map((lesson) => {
                
                const time = lesson.duration.split(' ')[0]
                Revenue = Revenue + (parseInt(time)*10)/60
            })
            console.log("Revenue: ", Revenue)

            res.status(200).json({Revenue: Revenue})
        }
    })
})

module.exports = router
const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const roleCheck = require('../middleware/roleCheck')
const mysql = require('../helpers/Sql_connection')


router.post('/SubHistory', auth, roleCheck(["Learner"]), (req, res) => {
    const userId = req.user.id
    const query = `select * from subscription where learnerId = ?`
    mysql.query(query, [userId], (err, result) => {
        if(err){
            console.log(err)
            res.status(500).json({message: "Internal Server Error1!"})
        }else {
            res.status(200).json(result)
        }
    })
})

module.exports = router
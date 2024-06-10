const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const roleCheck = require('../middleware/roleCheck')
const mysql = require('../helpers/Sql_connection')


router.post('/getMyCourses', auth, roleCheck(["Tutor"]), (req, res)=> {
    const tutorId = req.user.id

    //getting courses from newest to oldest
    const query = `SELECT *
    FROM course
    where tutorId = ?
    ORDER BY created_at DESC `

    mysql.query(query, [tutorId], (err, result) => {
        if(err) {
            console.log(err);
            res.status(500).json({message: "Internal Server Error"})
        }else{
            res.status(200).json({result})
        }
    })  
})

module.exports = router
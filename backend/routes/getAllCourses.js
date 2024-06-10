const express = require('express')
const router = express.Router()
const mysql = require('../helpers/Sql_connection')


router.post('/getAllCourses', (req, res)=> {

    //getting courses from newest to oldest
    const query = `SELECT c.*, t.firstname, t.lastname, t.pfp, t.id as tutorId
    FROM course c, tutor t
    where tutorId = t.id
    ORDER BY created_at DESC`

    mysql.query(query, (err, result) => {
        if(err) {
            console.log(err);
            res.status(500).json({message: "Internal Server Error"})
        }else{
            res.status(200).json({result})
        }
    })  
})

module.exports = router
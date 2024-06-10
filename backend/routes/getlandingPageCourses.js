const express = require('express')
const router = express.Router()
const mysql = require('../helpers/Sql_connection')


router.post('/getCoursesLP', (req, res)=> {

    //getting courses from newest to oldest
    const query = `SELECT *
    FROM course
    ORDER BY created_at DESC
    limit 15
    `

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
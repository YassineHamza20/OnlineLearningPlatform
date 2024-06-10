const express = require('express')
const router = express.Router()
const mysql = require('../helpers/Sql_connection')


router.post('/getTutorinfoLandingPage', (req, res)=> {

    //getting courses from newest to oldest
    const query = `SELECT 
    t.id,
    t.firstname,
    t.lastname,
    t.introductionVideo,
    t.pfp,
    t.languages,
    t.Country,
    t.created_at,
    COUNT(lt.tutorId) AS like_count
	from likedTutors lt, tutor t 
    where t.id = lt.tutorId
GROUP BY 
    t.id, t.lastname, t.firstname
ORDER BY 
    like_count DESC
limit 3`

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
const express = require('express')
const router = express.Router()
const mysql = require('../helpers/Sql_connection')
const auth = require('../middleware/auth')
const roleCheck = require('../middleware/roleCheck')


router.post('/getDayLessons', auth, roleCheck(["Tutor"]), (req, res) => {
    const userId= req.user.id
    const {
        date //year-month-day
    } = req.body

    if(!date){
        res.status(400).json({ message: "Bad Data!" });
        return // to avoid further execution when data missing 
    }

    const query = `SELECT pl.* , l.pfp, l.lastname, l.firstname FROM private_lesson as pl, learner as l
    WHERE pl.start_time >= NOW() 
    AND DATE(pl.start_time) = ?
    AND pl.tutor_id = ? 
    and Accepted <> 0
    AND l.id = pl.private_learner_id`

    mysql.query(query, [date, userId], (err, result) => {
        if(err) {
            console.log(err)
            res.status(500).json({message: 'Internal Server Error'})
        }else {
            console.log(result)
            res.status(200).json({result: result})
        }
    })
})

module.exports = router
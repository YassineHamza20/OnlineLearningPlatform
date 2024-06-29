const express = require('express')
const router = express.Router()
const mysql = require('../helpers/Sql_connection')
const auth = require('../middleware/auth')
const roleCheck = require('../middleware/roleCheck')

//, auth, roleCheck(["Learner"])
router.post('/getDayLessons', (req, res) => {
    //const userId= req.user.id
    const userId= req.body.id
    const {
        date //year-month-day
    } = req.body

    if(!date){
        res.status(400).json({ message: "Bad Data!" });
        return // to avoid further execution when data missing 
    }

    const query = `SELECT pl.* , t.pfp, t.lastname, t.firstname FROM private_lesson as pl, tutor as t 
    WHERE pl.start_time >= NOW() 
    AND DATE(pl.start_time) = ?
    AND pl.private_learner_id = ? 
    and Accepted <> 0
    AND t.id = pl.tutor_id`

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
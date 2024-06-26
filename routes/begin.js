const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const roleCheck = require('../middleware/roleCheck')
const mysql = require('../helpers/Sql_connection')
// roleCheck(["learner"]), 
router.post('/finalstep', auth,(req, res)=> {
    const learning_goals = req.body.learning_goals
    const interested_topics = req.body.interested_topics


    if(learning_goals && interested_topics) {
        const userId = req.user.id
        const goalsJSON = JSON.stringify(learning_goals)
        const topicsJSON = JSON.stringify(interested_topics)
        const query = 'UPDATE learner SET learning_goals= ?, interested_topics = ? where id = ?'
        mysql.query(query, [goalsJSON, topicsJSON, userId], (err, result)=> {
            if(err) {
                console.log(err);
                res.status(500).json({message: "Internal Server Error"})
            }else {
                res.status(201).json({message: "Updated Successfully"})
            }
        })
    }
})

module.exports = router
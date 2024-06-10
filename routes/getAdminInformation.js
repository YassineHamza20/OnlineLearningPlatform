const express = require('express')
const router = express.Router()
const mysql= require('../helpers/Sql_connection')
const auth = require('../middleware/auth')
const roleCheck = require('../middleware/roleCheck')

router.post('/Dashboard', auth, roleCheck(["Admin"]), async (req, res) => {
    const query = `SELECT 
    (SELECT COUNT(id) FROM learner) AS learner_count,
    (SELECT COUNT(id) FROM tutor) AS tutor_count,
    (SELECT SUM(cost) FROM subscription) AS total_subscription_cost`

    mysql.query(query, (err, result) => {
        if(err) {
            console.log(err)
            res.status(500).json({message: "Internal Server Error"})
        }else {
            res.status(200).json(result)
        }
    })

})

module.exports = router
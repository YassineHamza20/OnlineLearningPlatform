const express = require('express')
const router = express.Router()
const mysql = require('../helpers/Sql_connection')
const auth = require('../middleware/auth')
const roleCheck = require('../middleware/roleCheck')

router.post('/getLearner', auth, roleCheck(["Tutor"]), (req, res) => {

    const {
        uuid
    } = req.body

    const query = `select firstname, lastname, pfp, id, country from learner where uuid = ?`
    mysql.query(query, [uuid], (err, result) => {
        if(err){
            console.log(err)
            res.status(500).json({message: "Internal Server Error"})
        }else {
            res.status(200).json({firstname: result[0].firstname, lastname:result[0].lastname, pfp: result[0].pfp, id: result[0].id, country: result[0].country})
        }
    })

})


module.exports = router
const express = require('express')
const router = express.Router()
const mysql= require('../helpers/Sql_connection')
const auth = require('../middleware/auth')
const roleCheck = require('../middleware/roleCheck')

router.post('/tutors', auth, roleCheck(["Admin"]), async (req, res) => {
    const query = `select id, firstname, lastname, pfp, email, isVerified, description, AboutMe, TeachingStyle, created_at, uuid from tutor
`

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
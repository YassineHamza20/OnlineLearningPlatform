const express = require('express');
const router = express.Router()
const auth = require('../middleware/auth')
const roleCheck = require('../middleware/roleCheck')
const mysql = require('../helpers/Sql_connection')
//roleCheck(["Learner"])
router.post('/personalize', auth, (req, res) => {
    const language_proficiency = req.body.language_proficiency
    const firstname = req.body.firstname
    const lastname = req.body.lastname
    if(language_proficiency) {
        const userId = req.user.id
        const query = 'UPDATE learner SET language_proficiency = ?, firstname= ?, lastname= ? where id = ?'
        mysql.query(query, [language_proficiency, firstname, lastname, userId], (err, result) => {
            if(err) {
                res.status(500).json({message: "Internal Server Error"})
            }else {
                res.status(201).json({message: "Updated Successfully"})
            }
        })
    }
})

module.exports = router
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const mysql= require('../helpers/Sql_connection')

router.post('/signup', async (req, res) => {
    const {
        email, password, firstname, lastname, tel, CIN
    } = req.body
    if(!email || !password || !firstname || !lastname || !tel || !CIN) {
        res.status(400).json({message:"No input!"})
        return
    }
    
    //making sure this email doesn't exist on our platform at all
    const selectQuery = `SELECT 'administrator' AS role, id, firstname, email
    FROM administrator
    WHERE email = ?
    
    UNION ALL
    
    SELECT 'tutor' AS role, id, firstname, email
    FROM tutor
    WHERE email = ?
    
    UNION ALL
    
    SELECT 'learner' AS role, id, firstname, email
    FROM learner
    WHERE email =  ?
    `
    mysql.query(selectQuery, [email, email, email], async(err, result) => {
        if(err) {
            console.log(err);
            res.status(500).json({message: "Internal Server Error"})
        }else if(result.length >0) {
            res.status(409).json({message:"Email Already exits!"})
        }else {
            const insertQuery = "insert into Administrator(email, firstname, lastname, tel, pword, CIN) Values(? ,?, ?, ?, ?, ?)"
            try {
                const hash = await bcrypt.hash(password, 10);
                mysql.query(insertQuery, [email, firstname, lastname, tel, hash, CIN], (insertErr, insertResult) => {
                    if(insertErr) {
                        console.log(insertErr)
                        res.status(500).json({message: "Internal Server Error!"})
                    }else {
                        res.status(201).json({message:"Created"})
                    }
                })
            } catch (error) {
                console.log(error)
                res.status(500).json({message: "Internal Server Error!"})
            }
        }
    })

})

module.exports = router
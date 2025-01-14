const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const mysql= require('../helpers/Sql_connection')
const generateAccessToken = require('../helpers/generateAccessToken')
const generateRefreshToken = require('../helpers/generateRefreshToken')
const verifyRecaptchaToken = require('../helpers/verifyRecaptchaToken')



router.post('/regularLogin', async (req, res) => {
    const {email, password, information, recaptchaToken} = req.body

    console.log('ip', req.ip);
    const verification = await verifyRecaptchaToken(recaptchaToken, req.ip)

    console.log('verification', verification);
    if(verification.success) { // if recaptcha token is true  
        if(!information === 'learner' && !information ==='tutor') { // if it's not a tutor nor a learner respond with error
            res.status(400).json({message: 'Invalid Request'})
        }
        if(email && password) { // checking whether the user sent his credentials or not
            //assuring that the email exists
            const query = `SELECT id, pword FROM ${mysql.escapeId(information)} where email = ?`
            mysql.query(query, [email], (err, result) => {
                if(err) {
                    console.log(err);
                    res.status(500).json({message: 'Internal Server Error'})
                }else if (result.length > 0) {
                    //if the email exits  we compare the stored password for the email and the given password from the user
                    const user = result[0]
                    bcrypt.compare(password, user.pword)
                    .then(async (match) => {
                        if(!match) {
                            res.status(401).json({message: 'Invalid Password'})//not matching case
                        }else {//matching case
                            //return tokenn
                            const {refreshToken} = await generateRefreshToken({id: user.id, role:information ==='learner'? "Learner": "Tutor"})
                            const {accessToken} = await generateAccessToken({id: user.id, role:information ==='learner'? "Learner": "Tutor"})
                            res.status(200).json({refreshToken: refreshToken, accessToken: accessToken})
                        }
                    })
                    .catch(error => {
                        console.log(error)
                        res.status(500).json({message: 'Internal Server Error'})
                    })
                }else {//email doesn't exist
                    res.status(401).json({message: 'Invalid Email'})
                }
            })
        }else {
            res.status(400).json({message: 'Invalid Request'})
        }
    }else {//wrong recaptcha token
        console.log(verification.success)
        res.status(verification.code).json(verification)
    }
})


module.exports = router
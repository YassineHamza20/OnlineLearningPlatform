const express = require('express')
const router = express.Router()
const mysql = require('../helpers/Sql_connection')
const generateVerificationToken = require('../helpers/generateVerificationToken')
const {generateLearnerEmailHtml, generateTutorEmailHtml } = require('../helpers/emailContent')
const sendEmail = require('../helpers/sendEmail')

//api for resending email verification 
router.post('/verification_Link', async (req, res) => {
    const {role, email, type} = req.body
    console.log("req.body: ", req.body);
    const query = `SELECT id, isVerified from ${mysql.escapeId(role).toLowerCase()} where email = ?`
    try {
        if (role === "Learner"){
            mysql.query(query, [email], async (err, result)=> {
                if(err) {
                    res.status(500).json({message: 'Internal Server Error1'})
                }
                else if(result.length > 0 ) {
                    if(result[0].isVerified === 0) {
                        const user = {id: result[0].id, role: role} 
                        //making verification token
                        const {verificationToken} = await generateVerificationToken(user)
                        if(type ==="Settings"){
                            //making the email beautiful
                            const url = `${process.env.BASE_URL}users/profile/Settings/verifyEmail/${verificationToken}`
                            const emailHtml = generateLearnerEmailHtml(url)
                            //sending verification email to user 
                            await sendEmail(email, "Email Verification", emailHtml)
                            res.status(201).json({message:"Email sent"})
                        }else if(type ==="Signup") { 
                            const url = `${process.env.BASE_URL}users/verify/${verificationToken}`
                            //making the email beautiful
                            const emailHtml = generateLearnerEmailHtml(url)
                            //sending verification email to user 
                            await sendEmail(email, "Email Verification", emailHtml)
                            res.status(201).json({message: "Email sent", roomId: `users_${email}`}) 
                        }
                    }
                    else {
                        res.status(409).json({message: 'User Already verified'})
                    }
                }
                else {
                    res.status(404).json({message: 'Account does not exist'})
                }
            })  
        }
        else if (role ==='Tutor') {
            mysql.query(query, [email], async (err, result)=> {
                if(err) {
                    res.status(500).json({message: 'Internal Server Error'})
                }
                else if(result.length > 0 ) {
                    if (result[0].isVerified === 0) {
                        const user = {id: result[0].id, role: role} 
                        //making verification token
                        const {verificationToken} = await generateVerificationToken(user)
                        if(type ==="Settings") {
                            const url = `${process.env.BASE_URL}users/verify/${verificationToken}`
                            //making the email beautiful
                            const emailHtml = generateTutorEmailHtml(url)
                            //sending verification email to user 
                            await sendEmail(email, "Email Verification", emailHtml)
                            res.status(201).json({message: "Email sent", roomId: `users_${email}`})  
                        }else if(type ==="Signup"){
                            const url = `${process.env.BASE_URL}users/verify/${verificationToken}`
                            //making the email beautiful
                            const emailHtml = generateTutorEmailHtml(url)
                            //sending verification email to user 
                            await sendEmail(email, "Email Verification", emailHtml)
                            res.status(201).json({message: "Email sent", roomId: `users_${email}`}) 
                        }
                    }else {
                        res.status(409).json({message: 'User Already verified'})
                    }
                }
                else {
                    res.status(404).json({message: 'Account doesnt exist'})
                }
            })  
        }
        else {
            res.status(400).json({message: 'Wrong request'})
        }
    }catch(error) {
        res.status(500).json({message: 'Internal Server Error'})
    }
})

module.exports = router

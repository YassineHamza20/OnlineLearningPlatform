const express = require('express')
const router = express.Router()
const mysql = require('../helpers/Sql_connection')
const generateForgotPasswordToken = require('../helpers/generateForgotPasswordToken')
const {generateForgotPasswordHtml} = require('../helpers/emailContent')
const sendEmail = require('../helpers/sendEmail')




router.post('/forgotpassword', (req, res) => {
    const {email, role} = req.body

    if(role !== "learner" && role !== "tutor"){
        res.status(400).json({message: "Wrong!"})  //sending while not being a tutor nor a learner
    }

    const query = `select id from ${mysql.escapeId(role)} where email = ?`
    mysql.query(query, [email], async (error, result) => {
        if(error) {
            console.log(error);
            res.status(500).json({message: "Internal Server Error"})
        }else if(result.length <=0) {
            console.log("no email");
            res.status(202).json({message: ""})  //not indicating that the email doesn't exist in our database to avoid bots to know emails in our db
        }else {
            const userId = result[0].id 
            console.log("userId: ", userId)
            const user = {id: userId, role: role}


            //making forgotpassword Token
            const {forgotPasswordToken} = await generateForgotPasswordToken(user)
            
            const url = `${process.env.BASE_URL}users/ForgotPassword/${forgotPasswordToken}`

            //sending forgot password email 
            const emailHtml = generateForgotPasswordHtml(url)

             await sendEmail(email, "Reset Password", emailHtml)
             res.status(201).json({message: "Email sent"}) 

        }
    })
})

module.exports = router
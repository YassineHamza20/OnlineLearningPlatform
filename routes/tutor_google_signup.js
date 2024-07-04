const express = require('express');
const router = express.Router()
const mysql= require('../helpers/Sql_connection')
const verifyGoogleToken = require('../helpers/googleTokenverif')
const tutorInsertion = require('../helpers/tutorInsertion');


router.post('/signupgoogle', async (req, res) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1]
    if(token) {
        verifyGoogleToken(token)
        .then((payload) => {
            if (payload) {
                console.log('Token verified successfully');
                //verifying if the email already exists in the Database
                mysql.query('select email from learner where email = ? UNION select email from tutor where email = ? ', [payload.email, payload.email], (err, result) =>{
                    if(err) {
                        //if there is error in database return error 
                        console.log(err)
                        res.status(500).json({message:"Internal Server Error"})
                    }else {
                        //if the email doesn't exist insert it
                        if (result.length <= 0){
                            tutorInsertion(payload, res)
                        }
                        else {
                            //if the email exists return Error
                            console.log("user exists")
                            res.status(409).json({message:"Email Already Signed Up"})
                        }
                    }
                }) 
            } else {
                // if the token is invalid return error
                console.log('Token verification failed');
                res.status(400).json({message: "Token verification failed"})
            }
        })
        .catch((error) => {
            // if the token is invalid return error
            console.error('Error verifying Google token:', error)
            res.status(400).json({message:"Error verifying Google token"})
        });
    }else {
        //if the token is null return error
        console.log("no token given")
        res.status(400).json({message:"no token given"})
    }

})



module.exports = router
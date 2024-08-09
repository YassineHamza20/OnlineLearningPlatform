const express = require('express');
const router = express.Router()
const mysql= require('../helpers/Sql_connection')
const verifyGoogleToken = require('../helpers/googleTokenverif')
const tutorInsertion = require('../helpers/tutorInsertion');
const learnerInsertion = require('../helpers/learnerInsertion');
const generateAccessToken = require('../helpers/generateAccessToken');
const generateRefreshToken = require('../helpers/generateRefreshToken');


router.post('/GoogleLogin', async (req, res) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1]
    const information = req.body.information
    if(!information === 'learner' && !information ==='tutor') { // if it's not a tutor nor a learner respond with error
        res.status(400).json({message: 'Invalid Request'})
    }
    if(token) {
        verifyGoogleToken(token)
        .then((payload) => {
            if (payload) {
                console.log('Token verified successfully');
                //verifying if the email already exists in the Database
                const test =`SELECT id, email,uuid, 'tutor' as source FROM tutor WHERE email = ? UNION SELECT id, email,uuid, 'learner' as source FROM learner WHERE email = ?`
                mysql.query(test, [payload.email, payload.email], async (err, result) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({ message: "Internal Server Error" });
                    }
                
                    if (result.length === 0) {
                        // If the user does not exist, insert them into the appropriate table
                        if (information === 'tutor') {
                            tutorInsertion(payload, res);
                        } else {
                            learnerInsertion(payload, res);
                        }
                    } else {
                        // Destructure id, uuid, and source from the query result
                        const { uuid, id, source } = result[0];
                
                        // If the user exists, generate tokens and send them back
                        if ((information === 'tutor' && source === 'tutor') || (information === 'learner' && source === 'learner')) {
                            const { refreshToken } = await generateRefreshToken({ id, role: information === 'learner' ? "Learner" : "Tutor" });
                            const { accessToken } = await generateAccessToken({ id, role: information === 'learner' ? "Learner" : "Tutor", uuid });
                
                            return res.status(200).json({ role: information, refreshToken, accessToken });
                        } else {
                            return res.status(409).json({ message: `Not a ${information} account` });
                        }
                    }
                });
                
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



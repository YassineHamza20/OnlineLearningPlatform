const express = require('express')
const router = express.Router()
const mysql = require('../helpers/Sql_connection')
const verifyForgotPassword = require('../helpers/verifyForgotPasswordToken')
const bcrypt = require('bcrypt')




//checking if the token exists and viable to use, then updating the password and inserting the token in the blacklist of usedTokens in database
router.post('/resetpassword', async (req, res) => {
    const {password} = req.body
    if (!password || !req.headers.authorization ) {
        res.status(400).json({message: "either the token or the password is not provided"})
    }

    const forgotPasswordToken = req.headers.authorization.split(' ')[1]
    
    verifyForgotPassword(forgotPasswordToken)
        .then((response) => {
            bcrypt.hash(password, 10)
            .then(hash => {
                console.log(response);
                const updateQuery = `update ${mysql.escapeId(response.tokenDetails.role)} set pword = ? where id = ? `
                mysql.query(updateQuery, [hash, response.tokenDetails.id], (err, result) => {
                    if(err) {
                        console.log(err)
                        res.status(500).json({message: "Internal Server Error"})
                    }else {
                        console.log(forgotPasswordToken);
                        mysql.query("insert into usedtokens(token, role) VALUES(?, ?) ", [forgotPasswordToken, response.tokenDetails.role], (error, results) => {
                            if(error) {
                                console.log(error)
                                res.status(500).json({message: "Internal Server Error"})
                            }else {
                                console.log("passwordupdated");
                                res.status(200).json({role: response.tokenDetails.role, message:"Password updated"})
                            }
                        })
                        

                    }
                })
            })
        })
        .catch((err)=> {
            console.log(err);
            res.status(400).json({message:"bad token"})
        })

})

module.exports = router
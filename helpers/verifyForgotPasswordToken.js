const jwt = require('jsonwebtoken')
const mysql = require('../helpers/Sql_connection')

//verifying the forgotpassword token sent by the client  by checking the usedTokens table in database
const verifyForgotPassword = (forgotPasswordToken) => {
    const privateKey = process.env.FORGOTPASSWORD_TOKEN_SECRET
    
    return new Promise((resolve, reject) => {
        jwt.verify(forgotPasswordToken, privateKey, (err, tokenDetails) => {
            if (err) {
                //if the refresh token isn't valid, return error
                return reject({message: "Invalid verification Token"})
            }else {
                //checking if the token is already used or not 
                console.log(forgotPasswordToken);
                    const selectQuery = "select * from usedtokens where token = ? and role = ?"
                    mysql.query(selectQuery, [forgotPasswordToken, tokenDetails.role], (error, result) => {
                        if(error) {
                            console.log(err)
                            reject({message: "Internal Servor Error45!"})
                        }
                        else if (result.length <=0) {
                            console.log("result1: ", result);
                            resolve({
                                tokenDetails, 
                                message:"Valid Forgotpassword Token"
                            })
                        }else {
                            console.log("result:2", result);
                            return reject({message: "Token already Used!"})
                        }
                    })
            }
        })
    })
}

module.exports = verifyForgotPassword
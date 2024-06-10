const jwt = require('jsonwebtoken')

//verifying the verification token sent by the client 
const verifyVerificationToken = (verificationToken) => {
    const privateKey = process.env.VERIFICATION_TOKEN_SECRET
    
    return new Promise((resolve, reject) => {
        jwt.verify(verificationToken, privateKey, (err, tokenDetails) => {
            if (err) {
                //if the refresh token isn't valid, return error
                return reject({message: "Invalid verification Token"})
            }else {
                //if the token is valid return Valid
                resolve({
                    tokenDetails, 
                    message:"Valid verification Token"
                })
            }
        })
    })
}

module.exports = verifyVerificationToken
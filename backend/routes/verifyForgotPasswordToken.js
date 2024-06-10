const express = require('express')
const router = express.Router()
const verifyForgotPassword = require('../helpers/verifyForgotPasswordToken')


router.post('/verifyForgotPassword', async (req, res) => {
    if(req.headers.authorization){
        const forgotPasswordToken = req.headers.authorization.split(' ')[1] 
        verifyForgotPassword(forgotPasswordToken)
        .then((response) => {
            res.status(200).json({message:"token verified"})
        })
        .catch((err)=> {
            console.log(err);
            res.status(400).json({message:"bad token"})
        })
    }else {
        res.status(400).json({message:"No Token Given"}) //return error when no token given
    }
})

module.exports = router
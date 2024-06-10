const express = require('express');
const router = express.Router()
const jwt = require('jsonwebtoken')
const verifyRefreshToken = require('../helpers/verifyRefreshToken')

//creating new access token when the previous one expires
router.post('/', async (req, res)=> {
    if(req.headers.authorization) {
        const refreshtoken = req.headers.authorization.split(' ')[1]
        //verifying the refresh token sent from the user 
        verifyRefreshToken(refreshtoken)
        .then(({tokenDetails}) => {
            //if it's valid sign new access token and return it to the client
            const payload = {id: tokenDetails.id, role: tokenDetails.role}
            const accessToken = jwt.sign(
                payload, 
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn : "15m"}
            )
            res.status(200).json({
                accessToken,
                message:"Access Token created successfully"
            })
        })
        .catch((err)=> res.status(400).json(err)) //else return error 

    }else {
        res.status(400).json({message:"No Token Given"}) //return error when no token given
    }
})

module.exports = router
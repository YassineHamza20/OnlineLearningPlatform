const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const mysql= require('../helpers/Sql_connection')
const generateAccessToken = require('../helpers/generateAccessToken')
const generateRefreshToken = require('../helpers/generateRefreshToken')

router.post('/login', async (req, res) => {
    const {
        email, password
    } = req.body
    if(!email || !password) {
        res.status(400).json({message:"No input!"})
    }

    const verifQuery = "select id, pword from Administrator where email = ?"
    mysql.query(verifQuery, [email], (err, result) => {
        if(err) {
            console.log(err);
            res.status(500).json({message: "Internal Server Error!"})
        }else if(result.length >0){
            bcrypt.compare(password, result[0].pword)
            .then(async (match) => {
                if(!match) {
                    res.status(401).json({message: 'Invalid Password'})//not matching case
                }else {//matching case
                    //return token
                    const {refreshToken} = await generateRefreshToken({id: result[0].id, role: "Admin"})
                    const {accessToken} = await generateAccessToken({id: result[0].id, role: "Admin"})
                    res.status(200).json({refreshToken: refreshToken, accessToken: accessToken})
                }
            })
            .catch(error => {
                console.log(error)
                res.status(500).json({message: 'Internal Server Error'})
            })
        }
        else {
            res.status(401).json({message: 'Invalid Email'})
        }
    })

})

module.exports = router
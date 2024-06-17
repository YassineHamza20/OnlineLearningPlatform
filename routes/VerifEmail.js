
const express = require('express')
const router = express.Router()
const mysql = require('../helpers/Sql_connection')
const verifyVerificationToken = require('../helpers/verifyVerificationToken');
const generateRefreshToken = require('../helpers/generateRefreshToken');
const generateAccessToken = require('../helpers/generateAccessToken')

router.post('/verifEmail', async (req, res) => {
    try {
        const {type} = req.body
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        console.log("token verif email: ", token);
        
        const { tokenDetails } = await verifyVerificationToken(token);
        const payload = { id: tokenDetails.id, role: tokenDetails.role, email: tokenDetails.email };

        
        const query = `SELECT isVerified, email FROM ${mysql.escapeId(payload.role)} WHERE id = ?`;
        mysql.query(query, [payload.id], async (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({message: "Internal Server Error1"})
            }
            else if (result.length > 0) {
                if (result[0].isVerified !== 1) {
                    const verifQuery = `UPDATE ${mysql.escapeId(payload.role)} SET isVerified = 1 WHERE id = ?`;

                    mysql.query(verifQuery, [payload.id], async (err, result) => {
                        if (err) {
                            console.log(err);
                            res.status(500).json({message: "Internal Server Error2"})
                        }else {
                            if(type ==="Settings") {
                                res.status(200).json({ message: 'Email verified successfully', role :payload.role })
                            }else if(type ==="Signup"){
                                const { accessToken } = await generateAccessToken(payload);
                                const { refreshToken } = await generateRefreshToken(payload);
                                console.log("email verified successfully");
                                res.status(200).json({ message: 'Email verified successfully', verified: true, refreshToken, accessToken, role :payload.role })
                            }
                        }
                    });
                } else {
                    // User already verified
                    console.log('User already verified');
                    res.status(409).json( { message: 'User Already Verified', verified:false })//conflict
                }
            } else {
                console.log('Invalid link');
                res.status(404).json( { message: 'Invalid link' })
            }
        });
        
    }catch(err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error3', verified:false });
    }
})

module.exports = router
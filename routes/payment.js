const express = require('express')
const router = express.Router()
const mysql = require('../helpers/Sql_connection')
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');


function calculateChecksum(token, paymentStatus, apiToken) {
    const data = token + (paymentStatus ? '1' : '0') + apiToken;
    return crypto.createHash('md5').update(data).digest('hex');
  } 

router.post('/payment', (req, res) => {
    const {
        check_sum,
        payment_status,
        token,
        amount,
        order_id
    } = req.body

    console.log("body:", req.body);

    //verifying the identity of the sender
    const generatedCheckSum = calculateChecksum(
        token,
        payment_status === 'True',
        process.env.SECRETPAYMEE,
        )
    if(generatedCheckSum === check_sum) {
        mysql.query('select id from learner where uuid = ? ', [order_id], (err, result) => {
            if(err){
                console.log(err)
                res.status(500).json({message: "Internal Server Error"})
            }else {
                //generating unique key for subscription
                const uuid = uuidv4();
                
                //adding 30 days to current day to calculate date of expiration for the subscription
                const date = new Date();

                //payementDate
                const payementDate = date.toISOString().replace('T', ' ').substring(0, 19);

                // Add 30 days
                date.setDate(date.getDate() + 30);
        
                // Format the new date to timestamp to insert into MYSQl
                const formattedDate = date.toISOString().replace('T', ' ').substring(0, 19);
        
                const query = `insert into subscription(SubId, cost, PayementDate, ExpirationDate, learnerId) VALUES(?, ?, ?, ?, ?)`
                mysql.query(query, [uuid, parseInt(amount), payementDate, formattedDate, result[0].id], (insertErr, result)=>{
                    if(insertErr){
                        console.log(insertErr)
                        res.status(500).json({message: "Internal Server Error"})
                    }else {
                        res.status(200).json({message: "Correct!"})
                    }
                })
            }
        })
    }else {
        res.status(400).json({message: "Payement Error"})
    }
})


module.exports = router
// const express = require('express')
// const router = express.Router()
// const mysql = require('../helpers/Sql_connection')
// const crypto = require('crypto');
// const { v4: uuidv4 } = require('uuid');


// function calculateChecksum(token, paymentStatus, apiToken) {
//     const data = token + (paymentStatus ? '1' : '0') + apiToken;
//     return crypto.createHash('md5').update(data).digest('hex');
//   } 

// router.post('/payment', (req, res) => {
//     const {
//         check_sum,
//         payment_status,
//         token,
//         amount,
//         order_id
//     } = req.body

//     console.log("body:", req.body);

//     //verifying the identity of the sender
//     const generatedCheckSum = calculateChecksum(
//         token,
//         payment_status === 'True',
//         process.env.SECRETPAYMEE,
//         )
//     if(generatedCheckSum === check_sum) {
//         mysql.query('select id from learner where uuid = ? ', [order_id], (err, result) => {
//             if(err){
//                 console.log(err)
//                 res.status(500).json({message: "Internal Server Error"})
//             }else {
//                 //generating unique key for subscription
//                 const uuid = uuidv4();
                
//                 //adding 30 days to current day to calculate date of expiration for the subscription
//                 const date = new Date();

//                 //payementDate
//                 const payementDate = date.toISOString().replace('T', ' ').substring(0, 19);

//                 // Add 30 days
//                 date.setDate(date.getDate() + 30);
        
//                 // Format the new date to timestamp to insert into MYSQl
//                 const formattedDate = date.toISOString().replace('T', ' ').substring(0, 19);
        
//                 const query = `insert into subscription(SubId, cost, PayementDate, ExpirationDate, learnerId) VALUES(?, ?, ?, ?, ?)`
//                 mysql.query(query, [uuid, parseInt(amount), payementDate, formattedDate, result[0].id], (insertErr, result)=>{
//                     if(insertErr){
//                         console.log(insertErr)
//                         res.status(500).json({message: "Internal Server Error"})
//                     }else {
//                         res.status(200).json({message: "Correct!"})
//                     }
//                 })
//             }
//         })
//     }else {
//         res.status(400).json({message: "Payement Error"})
//     }
// })


// module.exports = router


const express = require('express');
const router = express.Router();
const axios = require('axios');
const mysql = require('../helpers/Sql_connection');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

function calculateChecksum(token, apiToken) {
    const data = token + apiToken;
    return crypto.createHash('md5').update(data).digest('hex');
}

router.post('/payment', (req, res) => {
    const { order_id, duration } = req.body;
    const token = 'test_token';
    let amount;

    // Set amount based on duration
    switch (duration) {
        case 'day':
            amount = 30000;
            break;
        case 'month':
            amount = 70000;
            break;
        case 'year':
            amount = 500000;
            break;
        default:
            return res.status(400).json({ message: "Invalid duration specified" });
    }

    const check_sum = calculateChecksum(token, process.env.SECRETPAYMEE);

    mysql.query('SELECT id FROM learner WHERE id = ?', [order_id], async (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Internal Server Error", error: err });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "Learner not found" });
        }

        const learnerId = result[0].id;
        const uuid = uuidv4();

        try {
            const response = await axios.post('https://developers.flouci.com/api/generate_payment', {
                app_token: process.env.FLOUCI_PUBLIC_TOKEN,
                app_secret: process.env.FLOUCI_PRIVATE_TOKEN,
                amount: amount,
                accept_card: "true",
                session_timeout_secs: 3000,
                success_link: `${process.env.FRONT_SERVER_URL}/learner/payment_success?learnerId=${learnerId}&subId=${uuid}&duration=${duration}`,
                fail_link: `${process.env.FRONT_SERVER_URL}/learner/payment_fail`,
                developer_tracking_id: uuid
            }, {
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.data && response.data.result.link) {
                const payment_id = response.data.result.payment_id || uuid;
                res.status(200).json({
                    payment_url: response.data.result.link,
                    success_url: `${process.env.FRONT_SERVER_URL}/learner/payment_success?learnerId=${learnerId}&subId=${uuid}&payment_id=${payment_id}&duration=${duration}`,
                    fail_url: `${process.env.FRONT_SERVER_URL}/learner/payment_fail`
                });

            } else {
                res.status(500).json({ message: "Internal Server Error", error: "No payment link in response" });
            }
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error", error: error });
        }
    });
});

router.get('/profile', (req, res) => {
    res.send('Redirecting to learner profile...');
});

router.get('/payment_success', async (req, res) => {
    const { learnerId, subId, payment_id, duration } = req.query;

    console.log('Received query params:', req.query);

    try {
        let amount;
        const paymentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const expirationDate = new Date();

        switch (duration) {
            case 'day':
                amount = 30000;
                expirationDate.setDate(expirationDate.getDate() + 7);
                break;
            case 'month':
                amount = 70000;
                expirationDate.setMonth(expirationDate.getMonth() + 1);
                break;
            case 'year':
                amount = 500000;
                expirationDate.setFullYear(expirationDate.getFullYear() + 1);
                break;
            default:
                return res.status(400).json({ message: "Invalid duration specified" });
        }

        const formattedExpirationDate = expirationDate.toISOString().slice(0, 19).replace('T', ' ');

        console.log('Preparing to insert with values:', {
            subId, amount, paymentDate, formattedExpirationDate, learnerId
        });

        mysql.query(
            'INSERT INTO subscription (SubId, cost, PayementDate, ExpirationDate, learnerId) VALUES (?, ?, ?, ?, ?)', 
            [subId, amount, paymentDate, formattedExpirationDate, learnerId],
            (insertErr, results) => {
                if (insertErr) {
                    console.error("Database insert error:", insertErr);
                    return res.status(500).json({ message: "Internal Server Error", error: insertErr.message });
                }
                if (results.affectedRows === 0) {
                    console.log("No records inserted, check your data and constraints.");
                    return res.status(400).json({ message: "No records inserted, check your data and constraints." });
                }   
                console.log('Insert successful, subscription added:', results);
                res.redirect('/learner/profile');
            }
        );
    } catch (error) {
        console.error('Error handling payment success:', error);
        res.status(500).json({ message: "Internal server error", error: error.toString() });
    }
});

router.get('/payment_fail', (req, res) => {
    res.send('Payment failed. Please try again.');
});

module.exports = router;

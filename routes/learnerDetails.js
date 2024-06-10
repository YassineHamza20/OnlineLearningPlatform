const express = require('express');
const router = express.Router()
const auth = require('../middleware/auth')
const roleCheck = require('../middleware/roleCheck')
const mysql = require('../helpers/Sql_connection')


router.post('/details', auth, roleCheck(["Learner"]), (req, res) => {
    console.log(req.user.id);
    const userId = req.user.id
    const query ='select * from learner where id = ?'
    mysql.query(query, [userId] , (err, result) => {
        if(err) {
            console.log(err)
            res.status(500).json({message: 'Internal Server Error'})
        }else if(result.length ===0) {
            console.log("no user with this id");
            res.status(400).json({message: "user doesn't exist"})
        }else {
            console.log("LEARENER DATA:", result[0]);
            const subscriptionQuery = `SELECT SubId, cost, PayementDate, ExpirationDate, learnerId
            FROM subscription
            WHERE ExpirationDate >= CURRENT_DATE and learnerId = ?`
            mysql.query(subscriptionQuery, [userId], (subscriptionErr, subscriptionResult)=> {
                if(subscriptionErr){
                    res.status(500).json({message:"Internal Server Error"})
                }else {
                    const data = {
                        id: userId,
                        firstname: result[0].firstname,
                        lastname: result[0].lastname,
                        email: result[0].email,
                        isSubscribed: subscriptionResult.length >0? true : false,
                        pfp: result[0].pfp,
                        country: result[0].Country,
                        tel: result[0].tel,
                        language_proficiency: result[0].language_proficiency,
                        learning_goals: result[0].learning_goals ? result[0].learning_goals : "[]" ,
                        interested_topics: result[0].interested_topics? result[0].interested_topics : "[]",
                        Birthday: result[0].Birthday? result[0].Birthday : "",
                        uuid: result[0].uuid,
                        created_at: result[0].created_at,
                        isVerified : result[0].isVerified
                    }
                    res.status(200).json({message: data})
                }
            })
        }
    })  

})

module.exports = router
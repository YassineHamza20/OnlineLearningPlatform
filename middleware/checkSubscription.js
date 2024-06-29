const mysql = require('../helpers/Sql_connection')

//checking wether the learner is subscribed
const isSubscribed = async (req, res, next) => {
   const userId = req.user.id
   const subscriptionQuery = `SELECT SubId, cost, PayementDate, ExpirationDate, learnerId
    FROM subscription
    WHERE ExpirationDate >= CURRENT_DATE and learnerId = ?`
    mysql.query(subscriptionQuery, [userId], (err, result) => {
        if(err){
            console.log(err);
            res.
            status(500)
            .json({message: "Internal server error2!"})
        }else {
            if(result.length >0) {
                next()
            }else {
                console.log("not payed! Must be premuim");
                res.
                status(402)
                .json({message: "Not payed!"})
            }
        }
    })
}

module.exports = isSubscribed
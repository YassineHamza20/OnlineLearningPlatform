const express = require('express')
const router = express.Router()
const mysql= require('../helpers/Sql_connection')
const auth = require('../middleware/auth')
const roleCheck = require('../middleware/roleCheck')

router.post('/learners', auth, roleCheck(["Admin"]), async (req, res) => {
    const query = `SELECT 
	l.id, l.email, l.firstname, l.lastname, l.pfp, l.country, l.isVerified, l.created_at, l.uuid,
    CASE 
        WHEN s.SubId IS NOT NULL THEN 'Premium' 
        ELSE 'Not Premium' 
    END AS subscription_status
FROM 
    learner l
LEFT JOIN (
    SELECT 
        learnerId, 
        MAX(SubId) AS SubId
    FROM 
        subscription
    WHERE 
        ExpirationDate >= CURRENT_DATE
    GROUP BY 
        learnerId
) s ON l.id = s.learnerId;
`

    mysql.query(query, (err, result) => {
        if(err) {
            console.log(err)
            res.status(500).json({message: "Internal Server Error"})
        }else {
            res.status(200).json(result)
        }
    })

})

module.exports = router
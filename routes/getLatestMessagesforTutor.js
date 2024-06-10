const express = require('express');
const router = express.Router()
const auth = require('../middleware/auth')
const roleCheck = require('../middleware/roleCheck')
const mysql = require('../helpers/Sql_connection')


router.post( '/getLatestMessages', auth, roleCheck(['Tutor']), (req, res) =>{
    const userId = req.user.id
    const query = `
    SELECT 
    c1.TextID,
    c1.IdLearner,
    c1.IdTutor,
    c1.Message as message,
    c1.MessageTime,
    c1.Sender,
    l.firstname,
    l.lastname,
    l.pfp,
    l.uuid
FROM 
    convo c1
JOIN (
    SELECT 
        IdLearner,
        MAX(MessageTime) AS LatestMessageTime
    FROM 
        convo
    WHERE 
        IdTutor = ?
    GROUP BY 
        IdLearner
) c2
ON c1.IdLearner = c2.IdLearner AND c1.MessageTime = c2.LatestMessageTime
JOIN learner l
ON c1.IdLearner = l.id
WHERE 
    c1.IdTutor = ?
ORDER BY 
    c1.MessageTime DESC;`
    mysql.query(query, [userId, userId], (error, result)=> {
        if (error) {
            console.log(error);
            res.status(500).json(error);
            
        }
        else { 
            console.log(result);
            res.status(200).json(result);
        }
    })
   

})

module.exports=router;
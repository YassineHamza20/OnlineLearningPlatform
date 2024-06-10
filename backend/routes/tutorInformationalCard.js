const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const roleCheck = require('../middleware/roleCheck')
const mysql = require('../helpers/Sql_connection')




router.post('/Information', auth, roleCheck(["Tutor"]), (req, res) => {
    const userId= req.user.id
    const query = `SELECT 
    (SELECT COUNT(tutorId) 
     FROM likedtutors 
     WHERE tutorId = ?) AS LikeCount,
     
    (SELECT COUNT(DISTINCT IdTutor, IdLearner) 
     FROM convo 
     WHERE IdTutor = ?) AS NumberOfConversations;`
    mysql.query(query, [userId, userId], (err, result) => {
        if(err) {
            console.log(err)
            res.status(500).json({message: "Internal Server Error"})
        }else {
            const likeCount = result[0].LikeCount? result[0].LikeCount : 0
            const chats = result[0].NumberOfConversations? result[0].NumberOfConversations : 0

            res.status(200).json({likeCount: likeCount, chats: chats})
        }
    })
})

module.exports = router
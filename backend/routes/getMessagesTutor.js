const express = require('express');
const router = express.Router()
const auth = require('../middleware/auth')
const roleCheck = require('../middleware/roleCheck')
const mysql = require('../helpers/Sql_connection')


router.post( '/getMessages', auth, roleCheck(['Tutor']), (req, res) =>{
    const userId = req.user.id;
    const {
        uuid} = req.body;
    
        const queryy ="SELECT id from learner where uuid=?"
    mysql.query(queryy, [uuid], (err, resul)=> {
        if (err) {
            console.log(err);
            res.status(500).json(err);
            
        }
        else { 
            const learnerId = resul[0].id;
            const query ="SELECT TextID, IdTutor, IdLearner, message, MessageTime, Sender, learner.id, firstname, lastname, pfp from convo, learner where convo.IdLearner=learner.id and ?=IdTutor and ?=IdLearner ORDER BY MessageTime ASC";
            mysql.query(query, [userId,learnerId], (error, result)=> {
                if (error) {
                    console.log(error);
                    res.status(500).json(error);
                    
                }
                else { 
                    console.log(result);
                    res.status(200).json(result);
                }
            })
        }
    })
   

}
)

module.exports=router;
const express = require('express');
const router = express.Router()
const auth = require('../middleware/auth')
const roleCheck = require('../middleware/roleCheck')
const mysql = require('../helpers/Sql_connection')


router.post( '/getMessages', auth, roleCheck(['Learner']), (req, res) =>{
    const userId = req.user.id;
    const {
        uuid} = req.body;
        
    const queryy ="SELECT id from tutor where uuid=?"
    mysql.query(queryy, [uuid], (err, resul)=> {
        if (err) {
            console.log(err);
            res.status(500).json(err);
            
        }
        else { 
            const tutorId = resul[0].id;
            const query ="SELECT TextID, IdTutor, IdLearner, message, MessageTime, Sender, firstname, lastname, tutor.id, pfp from convo, tutor where convo.IdTutor=tutor.id and ?=IdLearner and ?=IdTutor ORDER BY MessageTime ASC";
            mysql.query(query, [userId,tutorId], (error, result)=> {
                if (error) {
                    console.log(error);
                    res.status(500).json(error);
                    
                }
                else { console.log(result);
                    res.status(200).json(result);
                }
            })
        }
    })

    

}
)

module.exports=router;
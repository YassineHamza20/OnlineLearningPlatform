const express = require('express');
const router = express.Router()
const auth = require('../middleware/auth')
const roleCheck = require('../middleware/roleCheck')
const mysql = require('../helpers/Sql_connection')
const { v4: uuidv4 } = require('uuid');

router.post( '/saveMessages', auth, roleCheck(['Tutor']), (req, res) =>{
    const userId = req.user.id;
    const role = req.user.role;
    const {
        id,msg} = req.body;
    
    //generating unique key for convo
    const uuid = uuidv4();
        

    const queryy ="SELECT id, firstname, lastname, pfp from learner where uuid=?"
    mysql.query(queryy, [id], (err, resul)=> {
        if (err) {
            console.log(err);
            res.status(500).json(err); 
        } 
        else { 
        const query ="INSERT INTO  convo ( TextID, IdLearner, IdTutor, Message, Sender) VALUES (?,?,?,?,?)";
        mysql.query(query, [uuid,resul[0].id,userId,msg,role], (error, result)=> {
        if (error) {
            console.log(error);
            res.status(500).json(error);
            
        }
        else { 
            const query= `select pfp from tutor where id = ?`
            mysql.query(query, [userId], (selectError, selectResult) => {
                if(selectError) {
                    console.log(selectError);
                    res.status(500).json(selectError);
                }else {
                    console.log(result);
                    res.status(200).json({messageUuid: uuid, pfp: selectResult[0].pfp, id:resul[0].id });
                }
            } )
        }
    })
            
        }
    })
    

}
)

module.exports=router;
const express = require('express')
const router = express.Router()
const mysql = require('../helpers/Sql_connection');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

//, auth, roleCheck(["Admin"]),
router.post('/AdminInfo' ,(req, res)=> {
    
    //const userId = req.user.id
    const { userId } = req.body;
    
    const query = `select email, firstname, lastname, tel, CIN from administrator where id= ?`

    mysql.query(query, [userId], (err, result) => {
        if(err) {
            console.log(err);
            res.status(500).json({message: "Internal Server Error"})
        }else{
            res.status(200).json({result})
        }
    })  
})

module.exports = router
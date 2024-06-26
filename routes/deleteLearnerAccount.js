const express = require('express')
const router = express.Router()
const mysql = require('../helpers/Sql_connection')
const auth = require('../middleware/auth')
const roleCheck = require('../middleware/roleCheck')
const deleteExistingFileFromDB = require('../middleware/deleteFile')




router.post('/DeleteAccount', auth, roleCheck(["learner"]), (req, res) => {
    const userId = req.user.id

    const query = `delete from learner where id = ?`

    const directory = `./uploads/images/Learner/${userId}`
    deleteExistingFileFromDB(userId, "Learner", "image", directory)
    mysql.query(query, [userId], (err, result)=> {
        if(err) {
            console.log(err)
            res.status(500).json({message: "Internal Server Error"})
        }else {
            res.status(204).json({message:"Deleted"})
        }
    })
})


module.exports = router
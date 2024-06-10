const express = require('express')
const router = express.Router()
const mysql = require('../helpers/Sql_connection')
const auth = require('../middleware/auth')
const roleCheck = require('../middleware/roleCheck')
const deleteExistingFileFromDB = require('../middleware/deleteFile')




router.post('/DeleteAccount', auth, roleCheck(["Tutor"]), (req, res) => {
    const userId = req.user.id

    const query = `delete from tutor where id = ?`
    const directory = `./uploads/images/Tutor/${userId}`
    deleteExistingFileFromDB(userId, "Tutor", "image", directory)
    const dir =  `./uploads/videos/Tutor/${userId}`
    deleteExistingFileFromDB(userId, "Tutor", "video", dir)
    mysql.query(query, [userId], (err, aresult)=> {
        if(err) {
            console.log(err)
            res.status(500).json({message: "Internal Server Error"})
        }else {
            res.status(204).json({message:"Deleted"})
        }
    })
})


module.exports = router
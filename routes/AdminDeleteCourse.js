const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const roleCheck = require('../middleware/roleCheck')
const mysql = require('../helpers/Sql_connection')
const deleteExistingFileFromDB = require('../middleware/deleteFile')



router.post('/DeleteCourse', auth, roleCheck(["Admin"]), (req, res) => {
    const {
        courseId
    } = req.body

    const userId = req.user.id
    const directory = `./uploads/courses/tutor/${userId}`
    deleteExistingFileFromDB(courseId, "Tutor", "course", directory)
    const query = `delete from course where id = ?`

    mysql.query(query, [courseId], (err, result) => {
        if(err){
            console.log(err)
            res.status(500).json({message: "Internal Server Error"})
        }else {
            res.status(201).json({message: "Deleted"})
        }
    })
})

module.exports = router
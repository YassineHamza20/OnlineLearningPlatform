const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const roleCheck = require('../middleware/roleCheck')
const mysql = require('../helpers/Sql_connection')
const upload = require('../middleware/fileUploads')


router.post('/UpdateFile', auth, roleCheck(["Tutor"]), upload.fields([{ name: 'userFile', maxCount: 20 }]), (req, res) => {

    console.log("files: ", req.files);
    const pfpFileName = req.files['userFile'][0].filename;
    console.log("pfpFileName: ", req.body);
    const userId = req.user.id

    let query 

    if(req.body.type === "video") {
        query = `
            update tutor
            set introductionVideo = ?
            where id = ?
        `
    }else {
        query = `
        update tutor 
        set pfp = ?
        where id = ?`
    }


    mysql.query(query, [pfpFileName, userId], (err, result) => {
        if (err) {
            console.log(err)
            res.status(500).json({message: "Internal Server Error"})
        }else {
            console.log("Done Successfully!");
            res.status(200).json({fileName:pfpFileName})
        }
    })

})



module.exports = router
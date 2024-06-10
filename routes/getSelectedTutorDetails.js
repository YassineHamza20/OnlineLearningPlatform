const express = require('express');
const router = express.Router()
const auth = require('../middleware/auth')
const roleCheck = require('../middleware/roleCheck')
const mysql = require('../helpers/Sql_connection')


router.post('/selectedTutor', auth, roleCheck(["Learner"]), (req, res) => {
    const {
        uuid
    } = req.body
    const query ='select * from tutor where uuid = ?'
    mysql.query(query, [uuid], (err, result) => {
        if(err) {
            console.log(err)
            res.status(500).json({message: "Internal Servor Error"})
        }else if(result.length ===0) {
            console.log("no user with this id");
            res.status(400).json({message: "user doesn't exist"})
        } else {
            const data = {
                id: result[0].id,
                firstname: result[0].firstname,
                lastname: result[0].lastname,
                email: result[0].email,
                pfp: result[0].pfp,
                country: result[0].Country,
                tel: result[0].tel,
                Birthday: result[0].Birthday,
                introductionVideo: result[0].introductionVideo,
                description: result[0].description,
                teachingStyle: result[0].teachingStyle,
                AboutMe: result[0].AboutMe,
                Languages: result[0].Languages,
                WorkExperience: result[0].WorkExperience,
                Education : result[0].Education,
                created_at: result[0].created_at
            }
            console.log(data);
            res.status(200).json({message: data})
        }
    })
})

module.exports = router
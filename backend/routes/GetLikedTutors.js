const express = require('express')
const router = express.Router()
const mysql = require('../helpers/Sql_connection')
const auth = require('../middleware/auth')
const roleCheck = require('../middleware/roleCheck')



router.post('/LikedTutors', auth, roleCheck(["Learner"]), (req, res)=> {
    const userId = req.user.id

    const query = `
        select t.id, t.lastname, t.firstname, t.email, t.pfp, t.Country, t.tel, t.isConnected, t.Birthday, t.introductionVideo, t.description, t.teachingStyle, t.AboutMe, t.Languages, t.WorkExperience, t.Education, t.uuid,
        lt.id as likeId, lt.LikeDate
        from likedtutors as lt, tutor as t where lt.learnerId = ?
        and lt.tutorId = t.id
    `
    mysql.query(query, [userId], (err, result) => {
        if(err){
            console.log(err)
            res.status(500).json({message: "Internal Server Error"})
        }else {
            console.log("result: ", result);
            res.status(200).json({message: result})
        }
    })


})


module.exports = router
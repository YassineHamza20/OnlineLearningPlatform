// const express = require('express')
// const router = express.Router()
// const mysql = require('../helpers/Sql_connection')
// const auth = require('../middleware/auth')
// const roleCheck = require('../middleware/roleCheck')


// router.post('/getFirstLesson', auth, roleCheck(["Learner"]), (req, res) => {
//     const userId = req.user.id

//     //getting only the future lessons
//     const query = `SELECT *
//     FROM private_lesson t1
//     WHERE start_time = (
//         SELECT MIN(start_time)
//         FROM private_lesson t2
//         WHERE DATE(t2.start_time) = DATE(t1.start_time)
//         AND t2.start_time >= NOW()
//         AND private_learner_id = ?
//         AND t2.Accepted <> 0
//     )
//     AND t1.Accepted <> 0;`

//     mysql.query(query, [userId], (err, result) => {
//         if(err) {
//             console.log(err)
//             res.status(500).json({message:"Internal Server Error"})
//         }else {
//             res.status(200).json({message: result})
//         }
//     })


// })

// module.exports = router

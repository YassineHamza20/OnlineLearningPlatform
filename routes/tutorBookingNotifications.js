const express = require('express')
const router = express.Router()
const mysql = require('../helpers/Sql_connection')
const auth = require('../middleware/auth')
const roleCheck = require('../middleware/roleCheck')


router.post('/getNotifications', auth, roleCheck(["Tutor"]), (req, res) => {
    const userId = req.user.id
    const {
        page, pageSize, Accepted 
    } = req.body

    const offset = (parseInt(page) - 1) * parseInt(pageSize)
    console.log("Page:", page);
    console.log("PageSize:", pageSize);
    console.log("accepted: ", Accepted);

    console.log(offset);

    let query ;
    let dependancyArray ;
    let countQuery ;
    let countDependancy ;


    const accepted = parseInt(Accepted)


    //getting result based on the accepted object
    if(accepted !== 0 && accepted !==1 && accepted !== -1){
        //getting the scheduled lessons that didn't expire yet in an ascending order
        query = `SELECT pl.*, l.pfp, l.firstname, l.lastname, l.isConnected
        FROM private_lesson AS pl, learner AS l
        WHERE pl.private_learner_id = l.id
        AND pl.tutor_id = ?
        AND pl.start_time > NOW()
        ORDER BY pl.start_time ASC
        LIMIT ?, ?;`

        countQuery = `SELECT COUNT(*) AS totalRows
        FROM private_lesson AS pl, learner AS l
        WHERE pl.private_learner_id = l.id
        AND pl.tutor_id = ?
        AND pl.start_time > NOW()`
        
        dependancyArray = [userId, offset, parseInt(pageSize)]

        countDependancy = [userId]


    }else{
        query = `SELECT pl.*, l.pfp, l.firstname, l.lastname, l.isConnected
        FROM private_lesson AS pl, learner AS l
        WHERE pl.private_learner_id = l.id
        AND pl.tutor_id = ?
        AND pl.start_time > NOW()
        AND pl.Accepted = ?
        ORDER BY pl.start_time ASC
        LIMIT ?, ?;`

        countQuery = `SELECT COUNT(*) AS totalRows
        FROM private_lesson AS pl, learner AS l
        WHERE pl.private_learner_id = l.id
        AND pl.tutor_id = ?
        AND pl.Accepted = ?
        AND pl.start_time > NOW()`

        dependancyArray = [userId, accepted, offset, parseInt(pageSize)]

        countDependancy = [userId, accepted]
    }

    
    //getting the notifications
    mysql.query(query, dependancyArray, (err, result) => {
        if(err) {
            console.log(err)
            res.status(500).json({message: "Internal Server Error"})
        }else {
            //getting the number of notifications
            mysql.query(countQuery, countDependancy, (countErr, countResult) => {
                if (countErr) {
                    console.log(countErr);
                    res.status(500).json({ message: "Internal Server Error" });
                } else {
                    const totalRows = countResult[0].totalRows;
                    console.log("Total rows:", totalRows);
                    res.status(200).json({ notification: result, max: totalRows });
                }
            })
        }
    })
})

module.exports = router
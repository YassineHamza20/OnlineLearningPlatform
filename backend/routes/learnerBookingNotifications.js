const express = require('express')
const auth = require('../middleware/auth')
const roleCheck = require('../middleware/roleCheck')
const mysql = require('../helpers/Sql_connection')
const router = express.Router()


router.post('/getNotifications', auth, roleCheck(["Learner"]), (req, res) => {
    const userId= req.user.id
    const { page, pageSize, Accepted } = req.body

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
        //getting rows with condition on the accepted Column                
        countQuery = `SELECT COUNT(*) AS totalRows
        FROM private_lesson AS pl, tutor AS t
        WHERE pl.tutor_id = t.id
        AND pl.private_learner_id = ?
        AND pl.start_time > NOW()`
        dependancyArray = [userId, offset, parseInt(pageSize)]
        countDependancy = [userId]
        query =  `
        SELECT pl.*, t.pfp, t.firstname, t.lastname, t.isConnected
        FROM private_lesson AS pl, tutor AS t
        WHERE pl.tutor_id = t.id
        AND pl.private_learner_id = ?
        AND pl.start_time > NOW()
        ORDER BY pl.start_time ASC
        LIMIT ?, ?;`
    }else {
        //getting all rows regardless of accepted
        countQuery= `SELECT COUNT(*) AS totalRows
        FROM private_lesson AS pl, tutor AS t
        WHERE pl.tutor_id = t.id
        AND pl.private_learner_id = ?
        AND pl.Accepted = ?
        AND pl.start_time > NOW();`
        countDependancy= [userId, accepted]
        dependancyArray = [userId, accepted, offset, parseInt(pageSize)]
        query = `
        SELECT pl.*, t.pfp, t.firstname, t.lastname, t.isConnected
        FROM private_lesson AS pl, tutor AS t
        WHERE pl.tutor_id = t.id
        AND pl.private_learner_id = ?
        AND pl.start_time > NOW()
        AND pl.Accepted = ?
        ORDER BY pl.start_time ASC
        LIMIT ?, ?;`
    }
    
    


    mysql.query(query, dependancyArray, (err, result) => {
        if(err) {
            console.log(err)
            res.status(500).json({message: "Internal Server Error"})
        }else {

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
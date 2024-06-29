const express = require('express');
const router = express.Router();
const mysql = require('../helpers/Sql_connection');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

router.post('/getDayLessons', auth, roleCheck(["Learner"]), (req, res) => {
    const userId = req.user.id;
    const { date } = req.body;

    if (!date) {
        res.status(400).json({ message: "Bad Data!" });
        return;
    }

    const query = `SELECT pl.*, t.pfp, t.lastname, t.firstname 
    FROM private_lesson AS pl 
    JOIN tutor AS t ON t.id = pl.tutor_id 
    WHERE pl.start_time >= NOW() 
    AND DATE(pl.start_time) = ? 
    AND pl.private_learner_id = ? 
    AND pl.Accepted <> 0`;

    mysql.query(query, [date, userId], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ message: 'Internal Server Error' });
        } else {
            console.log(result);
            res.status(200).json({ result });
        }
    });
});

module.exports = router;

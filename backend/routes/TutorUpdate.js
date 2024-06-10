const express = require('express');
const router = express.Router();
const mysql = require('../helpers/Sql_connection');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');
const bcrypt = require('bcrypt');

router.post('/Update', auth, roleCheck(["Tutor"]), async (req, res) => {
    const { type, newParameter } = req.body;
    console.log(req.body);
    const userId = req.user.id;

    let query = 'UPDATE tutor SET';
    let dependencyArray = [];

    try {
        if (type === 'AboutMe') {
            query += ' AboutMe = ? WHERE id = ?';
            dependencyArray.push(newParameter, userId);
        } else if (type === 'langs') {
            query += ' languages = ? WHERE id = ?';
            dependencyArray.push(JSON.stringify(newParameter), userId);
        } else if (type === 'Education') {
            query += ' Education = ? WHERE id = ?';
            dependencyArray.push(JSON.stringify(newParameter), userId);
        } else if(type === 'ts') {
            query += ' teachingStyle = ? where id = ?'
            dependencyArray.push(newParameter, userId)
        }else if(type === "desc") {
            query += ' description = ? where id = ?'
            dependencyArray.push(newParameter, userId)
        } else if(type ==="W.E") {
            query += ' WorkExperience = ? where id = ?'
            dependencyArray.push(JSON.stringify(newParameter), userId)
        }else if (type === 'From') {
            query += ' Country = ? WHERE id = ?';
            dependencyArray.push(newParameter, userId);
        } else if (type === 'fName' && newParameter) {
            query += ' firstname = ? WHERE id = ?';
            dependencyArray.push(newParameter, userId);
        } else if (type === 'lName' && newParameter) {
            query += ' lastname = ? WHERE id = ?';
            dependencyArray.push(newParameter, userId);
        } else if (type === 'Pword' && newParameter) {
            // Hashing the password before insertion in the database
            const hash = await bcrypt.hash(newParameter, 10);
            query += ' pword = ? WHERE id = ?';
            dependencyArray.push(hash, userId);
        } else if (type === 'MNumber') {
            query += ' tel = ? WHERE id = ?';
            dependencyArray.push(newParameter, userId);  
        } else if (type === 'Bday') {
            query += ' Birthday = ? WHERE id = ?';
            dependencyArray.push(newParameter, userId);
        } else {
            console.log("badRequest:", type, newParameter);
            return res.status(400).json({ message: 'Bad Request!' });
        }

        console.log("query: ", query, "dependacy Array: ", dependencyArray);

        mysql.query(query, dependencyArray, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
            res.status(200).json({ message: 'Updated' });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;

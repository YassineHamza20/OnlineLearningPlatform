const express = require('express');
const router = express.Router();
const mysql = require('../helpers/Sql_connection');
const bcrypt = require('bcrypt');
const generateVerificationToken = require('../helpers/generateVerificationToken');
const sendEmail = require('../helpers/sendEmail');
const { generateLearnerEmailHtml } = require('../helpers/emailContent');
const { v4: uuidv4 } = require('uuid');

router.post('/regular_signup', (req, res) => {
    const email = req.body.email;
    const pword = req.body.pword;
    const pfp = req.body.pfp;

    if (!email || !pword) {
        res.status(400).json({ message: "One or more fields are empty. Please fill out the whole form" });
    } else {
        const query = 'SELECT email FROM learner WHERE email = ? UNION SELECT email FROM Tutor WHERE email = ?';
        mysql.query(query, [email, email], (err, result) => {
            if (err) {
                console.error('Database error during email check:', err);
                res.status(500).json({ message: "Error in database during email check" });
            } else {
                if (result.length > 0) {
                    res.status(409).json({ message: "Email Already Signed Up" });
                } else {
                    bcrypt.hash(pword, 10)
                        .then(hash => {
                            const uuid = uuidv4();
                            const insertionQuery = 'INSERT INTO LEARNER(email, pword, pfp, isVerified, uuid) VALUES(?, ?, ?, 0, ?)';
                            mysql.query(insertionQuery, [email, hash, pfp, uuid], async (err, result) => {
                                if (err) {
                                    console.error('Database error during insertion:', err);
                                    res.status(500).json({ message: "Error in database during insertion" });
                                } else {
                                    const userId = result.insertId;
                                    const user = { id: userId, role: "Learner" };

                                    try {
                                        const { verificationToken } = await generateVerificationToken(user);
                                        const url = `${process.env.BASE_URL}users/verify/${verificationToken}`;
                                        const emailHtml = generateLearnerEmailHtml(url);
                                        await sendEmail(email, "Email Verification", emailHtml);
                                        res.status(201).json({ message: "Email sent", roomId: `users_${email}` });
                                    } catch (error) {
                                        console.error('Error during email sending:', error);
                                        res.status(500).json({ message: "Error during email sending" });
                                    }
                                }
                            });
                        })
                        .catch(error => {
                            console.error('Error hashing password:', error);
                            res.status(500).json({ message: "Error hashing password" });
                        });
                }
            }
        });
    }
});

module.exports = router;

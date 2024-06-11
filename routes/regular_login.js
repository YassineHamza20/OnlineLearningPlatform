const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const mysql = require('../helpers/Sql_connection');
const generateAccessToken = require('../helpers/generateAccessToken');
const generateRefreshToken = require('../helpers/generateRefreshToken');
const verifyRecaptchaToken = require('../helpers/verifyRecaptchaToken');

router.post('/regularLogin', async (req, res) => {
    const { email, password, information, recaptchaToken } = req.body;

    console.log('Received request from IP:', req.ip);

    const verification = await verifyRecaptchaToken(recaptchaToken, req.ip);
    console.log('Recaptcha verification result:', verification);

    if (true) { // if recaptcha token is true
        if (information !== 'learner' && information !== 'tutor') { // if it's not a tutor nor a learner respond with error
            return res.status(400).json({ message: 'Not a learner nor tutor' });
        }
        if (email && password) { // checking whether the user sent his credentials or not
            // Assuring that the email exists
            const query = `SELECT id, pword FROM ${mysql.escapeId(information)} WHERE email = ?`;
            mysql.query(query, [email], (err, result) => {
                if (err) {
                    console.error('Database query error:', err);
                    return res.status(500).json({ message: 'Internal Server Error1' });
                }
                if (result.length > 0) {
                    // If the email exists, we compare the stored password for the email and the given password from the user
                    const user = result[0];
                    bcrypt.compare(password, user.pword)
                        .then(async (match) => {
                            if (!match) {
                                return res.status(401).json({ message: 'Invalid Password' }); // Not matching case
                            }
                            // Matching case
                            // Return token
                            const refreshToken = await generateRefreshToken({ id: user.id, role: information === 'learner' ? "Learner" : "Tutor" });
                            const accessToken = await generateAccessToken({ id: user.id, role: information === 'learner' ? "Learner" : "Tutor" });
                            return res.status(200).json({ refreshToken, accessToken });
                        })
                        .catch(error => {
                            console.error('Bcrypt comparison error:', error);
                            return res.status(500).json({ message: 'Internal Server Error2' });
                        });
                } else { // Email doesn't exist
                    return res.status(401).json({ message: 'Invalid Email' });
                }
            });
        } else {
            return res.status(400).json({ message: 'Wrong email or password' });
        }
    } else { // Wrong recaptcha token
        console.log('Recaptcha verification failed:', verification.success);
        return res.status(verification.code).json(verification);
    }
});

module.exports = router;

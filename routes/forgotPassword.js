const express = require('express');
const router = express.Router();
const mysql = require('../helpers/Sql_connection');
const generateForgotPasswordToken = require('../helpers/generateForgotPasswordToken');
const { generateForgotPasswordHtml } = require('../helpers/emailContent');
const sendEmail = require('../helpers/sendEmail');

router.post('/forgotpassword', (req, res) => {
    const { email, role } = req.body;

    // Validate the role input
    if (role !== "learner" && role !== "tutor") {
        return res.status(400).json({ message: "Invalid role!" });
    }

    // Ensure the role is sanitized
    const validRoles = ['learner', 'tutor'];
    if (!validRoles.includes(role)) {
        return res.status(400).json({ message: "Invalid role!" });
    }

    // Construct the query using the validated role
    const query = `SELECT id FROM ${mysql.escapeId(role)} WHERE email = ?`;
    mysql.query(query, [email], async (error, result) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal Server Error!" });
        } else if (result.length === 0) {
            console.log("No email found");
            return res.status(202).json({ message: "" });  // Not indicating that the email doesn't exist to avoid bots
        } else {
            const userId = result[0].id;
            console.log("userId:", userId);
            const user = { id: userId, role };

            try {
                // Generate forgot password token
                const { forgotPasswordToken } = await generateForgotPasswordToken(user);
                const url = `${process.env.BASE_URL}users/ForgotPassword/${forgotPasswordToken}`;

                // Generate the email content
                const emailHtml = generateForgotPasswordHtml(url);

                // Send the email
                await sendEmail(email, "Reset Password", emailHtml);
                res.status(201).json({ message: "Email sent" });
            } catch (err) {
                console.error(err);
                res.status(500).json({ message: "Error generating forgot password token or sending email" });
            }
        }
    });
});

module.exports = router;

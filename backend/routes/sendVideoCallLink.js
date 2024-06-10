const express = require('express') 
const router = express.Router()
const mysql = require('../helpers/Sql_connection')
const auth = require('../middleware/auth')
const roleCheck = require('../middleware/roleCheck')
const { generateLessonLinkEmailHtmlLearner, generateLessonLinkEmailHtmlTutor } = require('../helpers/emailContent')
const sendEmail = require('../helpers/sendEmail')

router.post('/sendVideoCallLink', auth, roleCheck(["Tutor"]), (req, res) => {
    const userId = req.user.id
    const {
        lesson_uuid,
        learner_id,
        lesson_topic, 
        lesson_date
    } = req.body

    console.log("uuid:", lesson_uuid);
    
    // Convert the timestamp string to a JavaScript Date object
    const dateObject = new Date(lesson_date);

    // Define options for date formatting
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };

    // the date object is in this format, for example : May 15, 2024
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(dateObject);

    const query = `select email, lastname, firstname from learner  where id = ?
    UNION select email, lastname, firstname from tutor where id = ?`

    mysql.query(query, [learner_id, userId], async (err, result) => {
        if(err) {
            console.log(err);
            res.status(500).json({message:"Internal Server Error"})
        }else {
            const learnerLink = `${process.env.BASE_URL}videoCall/${lesson_uuid}?name=${result[0].firstname+" "+result[0].lastname}`
            const tutorLink = `${process.env.BASE_URL}videoCall/${lesson_uuid}?name=${result[1].firstname+" "+result[1].lastname}`

            const emailHtmlforLearner = generateLessonLinkEmailHtmlLearner(`${result[1].firstname} ${result[1].lastname}`, learnerLink, lesson_topic, formattedDate) 
            const emailHtmlforTutor = generateLessonLinkEmailHtmlTutor(`${result[0].firstname} ${result[0].lastname}`, tutorLink, lesson_topic, formattedDate) 

            // send email to learner
            await sendEmail(result[0].email, `Your Upcoming Lesson: ${lesson_topic} with ${result[1].firstname} ${result[1].lastname} 📚`, emailHtmlforLearner)
            // send email to tutor
            await sendEmail(result[1].email, `Accepted: Teach ${lesson_topic} to ${result[0].firstname} ${result[0].lastname} 🎓`, emailHtmlforTutor)
            console.log("Email Sent");
            res.status(200).json({message:"Email Sent"})
        }
    })
})

module.exports = router
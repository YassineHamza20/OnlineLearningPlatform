const express = require('express');
const router = express.Router();
const mysql = require('../helpers/Sql_connection');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');
const upload= require('../middleware/fileUploads')

router.post('/personalization', auth, roleCheck(["Tutor"]), upload.fields([{ name: 'userFiles', maxCount: 20 }]), (req, res) => {
    console.log(req.files);
    const {
        Country,
        description,
        TeachingStyle,
        AboutMe,
        education,
        languages,
        workExperience,
        firstname,
        lastname
    } = req.body;

    console.log(req.body);
    /*const workExperience = JSON.parse(req.body.workExperience)
    const Languages = JSON.parse(req.body.languages)
    const Education = JSON.parse(req.body.education)*/
    const id = req.user.id;

    const pfpFileName = req.files['userFiles'][0].filename;
    const introductionVideoFileName = req.files['userFiles'][1].filename;



    // Update the tutor information with the filenames
    const query = 'UPDATE tutor SET firstname = ?, lastname = ?, Country = ?, pfp = ?, introductionVideo = ?, description = ?, teachingStyle = ?, AboutMe = ?, Languages = ?, WorkExperience = ?, education = ? WHERE id = ?';
    mysql.query(query, [firstname, lastname, Country, pfpFileName, introductionVideoFileName, description, TeachingStyle, AboutMe, languages, workExperience, education, id], (err, result) => {
        if (err) {
            console.error('Error updating tutor:', err);
            res.status(500).json({ error: 'Error updating tutor' });
        } else {
            console.log('Tutor updated successfully');
            res.status(200).json({ message: 'Tutor updated successfully' });
        }
    })
})


module.exports = router;

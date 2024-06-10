const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');
const mysql = require('../helpers/Sql_connection');

router.post('/RecommendedTutors', auth, roleCheck(["Learner"]), (req, res) => {
    const learnerId = req.user.id;
    console.log("learnerId: ", req.user.id);

    // First, fetch the learner's data
    const learnerQuery = `
    SELECT 
        id AS learner_id,
        interested_topics,
        learning_goals,
        language_proficiency
    FROM 
        learner
    WHERE 
        id = ?;
    `;

    mysql.query(learnerQuery, [learnerId], (err, learnerResults) => {
        if (err) return res.status(500).send(err);

        if (learnerResults.length === 0) {
            return res.status(404).send('Learner not found');
        }

        const learner = learnerResults[0];
        let topics = [];
        let goals = [];

        try {
            topics = learner.interested_topics ? JSON.parse(learner.interested_topics) : [];
        } catch (error) {
            return res.status(500).send('Error parsing interested_topics');
        }

        try {
            goals = learner.learning_goals ? JSON.parse(learner.learning_goals) : [];
        } catch (error) {
            return res.status(500).send('Error parsing learning_goals');
        }

        let tutorQuery = `
            SELECT 
                t.id AS tutor_id,
                t.description,
                t.teachingStyle,
                t.AboutMe,
                t.firstname, 
                t.lastname, 
                t.pfp,
                t.country,
                t.created_at,
                t.uuid
            FROM 
                tutor t
        `;

        const conditions = [];
        const queryParams = [];

        if (topics.length > 0) {
            topics.forEach(topic => {
                conditions.push(`
                    t.description LIKE ?
                    OR t.teachingStyle LIKE ?
                    OR t.AboutMe LIKE ?
                `);
                queryParams.push(`%${topic}%`, `%${topic}%`, `%${topic}%`);
            });
        }

        if (goals.length > 0) {
            goals.forEach(goal => {
                conditions.push(`
                    t.description LIKE ?
                    OR t.teachingStyle LIKE ?
                    OR t.AboutMe LIKE ?
                `);
                queryParams.push(`%${goal}%`, `%${goal}%`, `%${goal}%`);
            });
        }

        if (conditions.length > 0) {
            tutorQuery += 'WHERE ' + conditions.join(' OR ');
        }

        tutorQuery +=  " limit 0, 3"

        mysql.query(tutorQuery, queryParams, (err, tutorResults) => {
            if (err) return res.status(500).send(err);
            if (tutorResults.length <= 0) {
                const getQuery = `
                    SELECT 
                        t.id AS tutor_id,
                        t.firstname, 
                        t.lastname, 
                        t.pfp,
                        t.country,
                        t.created_at,
                        t.uuid
                    FROM 
                        tutor as t 
                    LIMIT 0, 3;
                `;
                mysql.query(getQuery, (getError, getResult) => {
                    if (getError) return res.status(500).send(getError);
                    console.log("condition not satisfied, returning any tutor");
                    res.status(200).json(getResult);
                });
            } else {
                console.log("condition satisfied, returning recommended tutors");
                console.log("resut: ", tutorResults);
                res.status(200).json(tutorResults);
            }
        });
    });
});

module.exports = router;

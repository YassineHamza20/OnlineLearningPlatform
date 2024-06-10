const express = require('express');
const router = express.Router()
const mysql = require('../helpers/Sql_connection')

 
router.post('/SearchTutors', (req, res) => {
    const {
        page, 
        pageSize,
        filterOptions
    } = req.body

    console.log("req.body: ", req.body);
    const offset = (parseInt(page) - 1) * parseInt(pageSize)

    let query = "SELECT t.id, t.lastname, t.firstname, t.email, t.pfp, t.Country, t.tel, t.isConnected, t.Birthday, t.introductionVideo, t.description, t.teachingStyle, t.AboutMe, t.Languages, t.WorkExperience, t.Education, t.uuid FROM TUTOR as t"
    let dependancyArray = []
    if (filterOptions.name ) {
        query += ` where (t.firstname like CONCAT('%', ?, '%') or t.lastname like CONCAT('%', ?, '%') OR CONCAT(t.firstname, ' ', t.lastname) LIKE CONCAT('%', ?, '%') OR CONCAT(t.lastname, ' ', t.firstname) LIKE CONCAT('%', ?, '%'))`
        dependancyArray.push(
            filterOptions.name, 
            filterOptions.name,
            filterOptions.name, 
            filterOptions.name,
        )
    }
    if(filterOptions.proficiency){

        if(dependancyArray.length ===0 ) {
            query += " WHERE"
        }else {
            query += " AND"
        }
        query += ` (JSON_CONTAINS(education, ?, '$') = 1
        OR JSON_CONTAINS(workexperience, ?, '$') = 1)`

        dependancyArray.push(
            JSON.stringify({ tag: filterOptions.proficiency}), 
            JSON.stringify({ tag: filterOptions.proficiency}))
        
    }
    if(filterOptions.language) {

        if(dependancyArray.length ===0){
            query += " WHERE"
        }else {
            query += " AND"
        }
        query+=" (JSON_CONTAINS(Languages, ?, '$') = 1)"
        dependancyArray.push(JSON.stringify({ language: filterOptions.language}))
    }
    if(filterOptions.availability){

        if(dependancyArray.length ===0) {
            query += " where"
        }else {
            query += " AND"
        }
        query+=` (id not in (
            select DISTINCT pl.tutor_id from private_lesson as pl
            where ((? >=start_time and ? <=end_time) and accepted <> 0)
        ))`

        dependancyArray.push(filterOptions.availability, filterOptions.availability)
    }

    const countQuery = query
    const countDependancyArray = dependancyArray
    query += " LIMIT ?, ?"
    dependancyArray.push(offset, parseInt(pageSize));
        
    //console.log("offset: ", offset);

    //console.log("query: ", query, " countQuery: ", countQuery, " dependancyArray: ", dependancyArray, "QuerydependancyArray: ", countDependancyArray);
 
    console.log("language:", filterOptions.language);
    console.log("query: ", query, " dependancy:", dependancyArray);
    mysql.query(query, dependancyArray, (error, result) => {
        if(error) {
            console.log("error: ", error );
            res.status(500).json({message: "Internal Servor Error"})
        }else if(result.length <=0) {
            console.log("no tutors");
            res.status(204).json({message:"No Tutors"})
        }
        else {
            console.log("tutors exist")
            //console.log(result)
            
            mysql.query(countQuery, countDependancyArray, (numberOfTutorsError, numberOfTutorsResult) => {
                if (numberOfTutorsError) {
                    console.log("error in searchTutors file specifically in numberOfTutorsErrorQuery", numberOfTutorsError);
                    res.status(500).json({message: "Internal Server Error"})
                }else {
                    console.log("totalRows: ", numberOfTutorsResult.length);
                    res.status(200).json({tutorsNumber: numberOfTutorsResult.length, tutorsList: result})
                }
            })
        }
    })
})


module.exports = router
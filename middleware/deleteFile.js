const path = require('path');
const fs = require('fs');
const mysql = require('../helpers/Sql_connection')

const deleteExistingFileFromDB = async (userId, userRole, type, directory) => {
 try {
     console.log(userId, userRole, type);
 
     let query
     if (type ==="video") {
         if(userRole === "Tutor") query = "SELECT introductionVideo as file from tutor where id= ? "
     }else if(type ==="image") {
         if(userRole === "Learner"){
             query = "SELECT pfp as file from learner where id = ?"
         }else if(userRole === "Tutor") {
             query = "Select pfp as file from tutor where id = ?"
         }else {
             return
         }
     }else if(type ==="course") {
        query = "select Course as file from course where id = ?"
     }
 
     console.log("query: ", query);
 
     mysql.query(query, [userId], (error, results) => {
         if (error) {
             console.log("delete error: ", error);
             return
         }
 
         if (results.length > 0 && results[0].file) {
            const filename = results[0].file;
             console.log("filename:" , results[0], "directory: ", directory);
             
 
             // Construct the full path of the file
             const filePath = path.join(directory, filename);
 
             // Check if the file exists and delete it
             if (fs.existsSync(filePath)) {
                 fs.unlinkSync(filePath);
             }
         }
 
         console.log("going next");
     });

 }catch(err) {
    console.log(err);
 }
};

module.exports = deleteExistingFileFromDB;

const generateAccessToken = require('./generateAccessToken')
const generateRefreshToken = require('./generateRefreshToken')
const mysql = require('./Sql_connection')
const { v4: uuidv4 } = require('uuid');




const tutorInsertion = async (payload, res) => {
    //generating unique key for tutor
    const uuid = uuidv4();
    const query = "INSERT INTO Tutor(firstname, lastname, email, pword, pfp, isVerified, uuid) VALUES (?, ?, ?, ?, ?, 1, ?)"
        mysql.query(query, [payload.given_name, payload.family_name, payload.email, '', payload.picture, uuid], async (err, result)=> {
            if(err) {
                //if there is error in data base return error 
                console.log(err)
                res.status(500).json({message:"Internal Server Error"})
            }
            else{
                //if the operation was succesful return tokens
                const userId = result.insertId
                const user = {id: userId, role: "Tutor"}

                const {accessToken} = await generateAccessToken(user)
                const {refreshToken} = await generateRefreshToken(user)
                
                res.status(201).json({
                    message:"Signed up succesfully", 
                    refreshToken: refreshToken, 
                    accessToken: accessToken,
                    firstname: payload.given_name,
                    lastname: payload.family_name
                })
            }
        })
}

module.exports = tutorInsertion
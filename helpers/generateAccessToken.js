const jwt = require('jsonwebtoken')


const generateAccessToken = async(user) => {
    try{
        const payload = {id: user.id, role: user.role}
        const accessToken = jwt.sign(
            payload, 
            process.env.ACCESS_TOKEN_SECRET, 
            {expiresIn: "50m"}
        )
        return Promise.resolve({accessToken})
        

    }catch(err) {
        return Promise.reject(err)
    }
}

module.exports = generateAccessToken
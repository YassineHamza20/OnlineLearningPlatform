const jwt = require('jsonwebtoken')

const generateRefreshToken = async(user) => {
    try{
        const payload = {id: user.id, role: user.role}
        const refreshToken = jwt.sign(
            payload,
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: "7d"}
        )

        return Promise.resolve({refreshToken})
        

    }catch(err) {
        return Promise.reject(err)
    }
}

module.exports =  generateRefreshToken
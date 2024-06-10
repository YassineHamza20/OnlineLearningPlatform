const jwt = require('jsonwebtoken')


//testing the validity of the token using this middleware
const auth = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(!token) 
        return res
            .status(401)
            .json({message:"Access Denied: No token provided"})

    try {
        //verifying access token
        const tokenDetails = jwt.verify(
            token, 
            process.env.ACCESS_TOKEN_SECRET
        )
        req.user = tokenDetails
        next()

    }catch (err) {
        res
            .status(401)
            .json({message:"Access Denied: Invalid token"})
    }
}

module.exports = auth
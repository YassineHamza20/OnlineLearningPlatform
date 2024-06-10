const jwt = require('jsonwebtoken')

// Function to generate a forgotPassword token with expiration
const generateForgotPasswordToken = async(user) => {
    try{
        const payload = {id: user.id, role: user.role}
        const forgotPasswordToken = jwt.sign(
            payload,
            process.env.FORGOTPASSWORD_TOKEN_SECRET,
            {expiresIn: "30m"}
        )

        return Promise.resolve({forgotPasswordToken})
        

    }catch(err) {
        return Promise.reject(err)
    }
};

module.exports = generateForgotPasswordToken
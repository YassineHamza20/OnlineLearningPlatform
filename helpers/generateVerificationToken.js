const jwt = require('jsonwebtoken')

// Function to generate a verification token with expiration
const generateVerificationToken = async(user) => {
    try{
        const payload = {id: user.id, role: user.role}
        const verificationToken = jwt.sign(
            payload,
            process.env.VERIFICATION_TOKEN_SECRET,
            {expiresIn: "30m"}
        )

        return Promise.resolve({verificationToken})
        

    }catch(err) {
        return Promise.reject(err)
    }
};

module.exports = generateVerificationToken
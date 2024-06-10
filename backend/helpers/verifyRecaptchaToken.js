const axios = require('axios')



const verifyRecaptchaToken = async (token, ip) => {
    try{
        const googleResponse= await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`)
        console.log(googleResponse.data);
        const { success } = googleResponse.data;
        if (success) {
            const response = { message: 'Form submitted successfully', success: true}
            return response
        } else {
            const response = { message: 'reCAPTCHA verification failed', success: false, code: 400}
            return response
        }
    }
    catch(error){
        console.log(error);
        const response = { message: 'Internal server error', success: false, code: 500}
        return response
    }
}

module.exports = verifyRecaptchaToken
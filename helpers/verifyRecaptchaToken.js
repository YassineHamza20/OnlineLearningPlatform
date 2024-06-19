const axios = require('axios');

const verifyRecaptchaToken = async (token, ip) => {
    try {
        const params = new URLSearchParams();
        params.append('secret', '6LfKH_spAAAAAOXNkwc2hCeJzapZ7LlJ5W_2h2zJ');
        params.append('response', token);
        if (ip) params.append('remoteip', ip); // Optionally include the user's IP address

        const googleResponse = await axios.post('https://www.google.com/recaptcha/api/siteverify', params.toString(), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        console.log(googleResponse.data);
        const { success } = googleResponse.data;

        if (success) {
            const response = { message: 'Form submitted successfully', success: true };
            return response;
        } else {
            const response = { message: 'reCAPTCHA verification failed', success: false, code: 400 };
            return response;
        }
    } catch (error) {
        console.log(error);
        const response = { message: 'Internal server error', success: false, code: 500 };
        return response;
    }
};

module.exports = verifyRecaptchaToken;

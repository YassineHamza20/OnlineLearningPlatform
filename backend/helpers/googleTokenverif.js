

async function verifyGoogleToken(token) {
    try {
        //test if the token is valid or not 
        const response = await fetch(
            "https://www.googleapis.com/oauth2/v3/userinfo", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        if (!response.ok) {
            //if the token is not valid throw error 
            throw new Error('Failed to fetch user info');
        }
        //else return user Data
        const payload = await response.json();
        return payload;
    } catch (err) {
        //return null in case of error 
        console.error(err);
        return null;
    }
}

module.exports = verifyGoogleToken;

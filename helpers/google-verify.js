const { OAuth2Client } = require('google-auth-library');



const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleverify = async (idToken = '') =>{

    const ticket = await client.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID,  

    });
    const {name:nombre,picture:avatar,email} = ticket.getPayload();

    return {nombre,avatar,email};

}


module.exports = {
    googleverify
}
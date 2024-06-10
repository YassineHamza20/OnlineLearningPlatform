const nodemailer = require('nodemailer')

console.log(process.env.USER, process.env.PASS);
module.exports = async (email, subject, html) => {
    try {
        const transporter = nodemailer.createTransport({
            host:process.env.HOST, 
            service: process.env.SERVICE,
            post: Number(process.env.EMAIL_PORT), 
            secure: Boolean(process.env.SECURE),
            auth: {
                user: process.env.USER,
                pass: process.env.PASS
            }
        })
        
        await transporter.sendMail({
            from: process.env.USER,
            to:email,
            subject:subject,
            html:html
        })
        console.log("Email sent Successfully");
    }catch(err) {
        console.log("Email not sent", err);
    }
}
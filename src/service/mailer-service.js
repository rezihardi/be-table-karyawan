const service = {}
const mailer = require('nodemailer')

let transporter = mailer.createTransport({
    service: 'gmail',
    auth: {
        user: "rezydoerasta@gmail.com",
        pass: ""
    }
});

service.sendEmail = async (message) => {
    try {
        await transporter.sendMail({
            from: '"zaecaW" <untarizaeca@gmail.com>',
            to: '"rezydoerasta" <rezydoerasta@gmail.com>',
            subject: 'Scheduled Email',
            text: message
        })
    } catch (e) {
        console.log(e);
    }
}

module.exports = service
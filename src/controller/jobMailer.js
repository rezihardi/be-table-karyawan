const controller = {}
const cron = require('node-cron')
const util = require('../helpers/util')
const mailService = require('../service/mailer-service')


// cron.schedule('* * * * *', async () => {
//     // console.log("Task is running every minute " + new Date())
//     await mailService.sendEmail("email was sent to u")
// });

module.exports = controller

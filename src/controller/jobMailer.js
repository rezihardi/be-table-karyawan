const controller = {}
const cron = require('node-cron')
const util = require('../helpers/util')
const mailService = require('../service/mailer-service')
const moment = require("moment");

cron.schedule('* * * * *', async () => {
    console.log("Task is running every minute " + moment().locale('id').format('LLL'))
    // await mailService.sendEmail("email was sent to u")
});

module.exports = controller

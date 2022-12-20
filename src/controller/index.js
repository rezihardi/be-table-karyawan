const karyawan = require('./controller-karyawan');
const job = require('./jobMailer')

const controller = {};
controller.karyawan = karyawan;
controller.job = job

module.exports = controller;
const karyawan = require('./controller-karyawan');
const job = require('./jobMailer')
const product = require('./controller-product')

const controller = {};
controller.karyawan = karyawan;
controller.job = job;
controller.product = product;

module.exports = controller;
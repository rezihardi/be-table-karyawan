const router = require('express').Router();
const controller  = require('../controller/index')

router.get('/all-karyawan', controller.karyawan.getKaryawan);
router.post('/karyawan', controller.karyawan.saveBulkKaryawan);
router.delete('/karyawan', controller.karyawan.delete);
router.get('/flightsLaxKaryawan', controller.karyawan.getFLightMule)
router.get('/one-karyawan/:nik', controller.karyawan.getByNik)
router.delete('/delete-by-id/:nik', controller.karyawan.deleteById)

module.exports = router;

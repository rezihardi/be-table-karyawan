const router = require('express').Router();
const controller  = require('../controller/index')

router.get('/all-karyawan', controller.karyawan.getKaryawan);
router.post('/karyawan', controller.karyawan.saveBulkKaryawan);
router.delete('/karyawan', controller.karyawan.delete);
router.get('/flightsLaxKaryawan', controller.karyawan.getFLightMule);
router.get('/get-ip-addr/:ip', controller.karyawan.getIPAddr)
router.get('/one-karyawan/:nik', controller.karyawan.getByNik);
router.put('/edit-karyawan-obj', controller.karyawan.editByid);
router.delete('/delete-by-id/:nik', controller.karyawan.deleteById);

router.get('/all-product', controller.product.getProduct);
router.post('/products', controller.product.saveProduct)
router.get('/get-product-by-id/:id', controller.product.getProductById)
router.delete('/delete-product-by-id/:id', controller.product.deleteProductById)
router.put('/updateProduct/:id', controller.product.updateProduct)


module.exports = router;

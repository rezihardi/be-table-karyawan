const service = {};
const model = require('../model/index')
const { Op } = require('sequelize');

service.updateKaryawan = async (obj) => {
    let result = await model.karyawanModel.update(obj, {
        where: {
            nik: obj.nik
        }
    })

    return result;
}

service.saveKaryawan = (obj) => {
    return model.karyawanModel.create(obj);
}

service.destroyKaryawan = async(obj) => {
    await model.karyawanModel.destroy({
        where :{
            nik : obj.nik
        },
        force: true
    })
}

service.getKaryawanByNik = async (nik) => {
    return await model.karyawanModel.findOne({
        where: {
            nik: nik
        }
    })
}
module.exports = service
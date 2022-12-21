const service = {};
const model = require('../model/index')
const { Op } = require('sequelize');

service.getOneProduct = async (id) =>{
    return await model.productModel.findOne({
        where: {
            name: id
        }
    })
}
module.exports = service
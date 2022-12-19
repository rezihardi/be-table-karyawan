const controller = {}
const db = require('../config/database')
const query = require('../model/raw-query')
const status = require('../helpers/status-helper')
const model = require('../model/index')
const util = require('../helpers/util')
const service = require('../service/service-karyawan')
const {response} = require("express");
const { Op } = require('sequelize');
const api = require('../service/api-axios')



controller.getKaryawan = async (req, res) => {
    try{
        let result = {}
        const limit = parseInt(req.query.limit) || 10
        const page = parseInt(req.query.page) || 0
        const search = req.query.search_query || ""
        const offset = limit * page
        const totalRows = await model.karyawanModel.count({
            where:{
                [Op.or]: [{nik:{
                        [Op.like]: '%'+search+'%'
                    }}, {nama:{
                        [Op.like]: '%'+search+'%'
                    }}, {alamat: {
                        [Op.like]: '%'+search+'%'
                    }}]
            }
        });
        const totalPage = Math.ceil(totalRows / limit)
        result = await model.karyawanModel.findAll({
            where:{
                [Op.or]: [{nik:{
                        [Op.like]: '%'+search+'%'
                    }}, {nama:{
                        [Op.like]: '%'+search+'%'
                    }}, {alamat: {
                        [Op.like]: '%'+search+'%'
                    }}]
            },
            offset: offset,
            limit: limit,
            order:[
                ['nik', 'DESC']
            ]
        });

        res.status(status.statusCode.success).json(status.successMessage({
            result: result,
            page:page,
            limit: limit,
            totalRows: totalRows,
            totalPage: totalPage
        }));

    } catch (err)  {
        console.log(err);
        res.status(status.statusCode.bad).json(status.errorMessage(err))
    }
}

controller.getByNik = async (req, res) => {
    try{
        let rs = {}
        let nik = req.params.nik
        rs = await service.getKaryawanByNik(nik)

        util.isObjectEmpty(rs) ?
            res.status(status.statusCode.notfound).json(status.emptyFile("nik tersebut kosong")) :
            res.status(status.statusCode.success).json(status.successMessage(rs));
    } catch (e){
        console.log(e)
        res.status(status.statusCode.bad).json(status.errorMessage(e))
    }
}

//digunakan 1 object untik saat ini
controller.saveBulkKaryawan = async (req, res) => {
    //save update bulk
    try{
        let masukan = req.body
        
        //session create
        let create = masukan.filter((value) => value.nik === undefined)
        let arrGabung = []
        for (let i = 0; i < create.length; i++) {

            const lastNik = await db.query(query.prosesIncrement, {
                type: db.QueryTypes.SELECT,
            })
            let add1 = await service.saveKaryawan({
                nik: util.isObjectEmpty(lastNik) ? 1 : lastNik[0].lastNik,
                alamat: create[i].alamat,
                nama: create[i].nama,
            })
            arrGabung.push(add1.dataValues)
        }

        //session update    
        let update = masukan.filter((value) => value.nik !== undefined)
        update.map(async (val) => {
            await service.updateKaryawan(val)

        })
        arrGabung.push(...update)
        res.status(status.statusCode.success).json(status.successMessage(arrGabung))

    } catch(err){
        console.log(err);
        res.status(status.statusCode.bad).json(status.errorMessage(err))
    }
}

controller.delete = async (req, res) => {
    try {
        let deleted = req.body
        deleted.map(async (el) => {
            await service.destroyKaryawan(el)
        })
        res.status(status.statusCode.success).json(status.successMessage(deleted))
    } catch (e) {
        console.log(e)
        res.status(status.statusCode.bad).json(status.errorMessage(e))
    }
}

controller.deleteById = async (req, res) => {
    try {
        let id = req.params.nik
        let obj = {
            nik: id
        }
        await service.destroyKaryawan(obj)
        res.status(status.statusCode.success).json(status.successMessage({
            message: "berhasil menghapus nik ".concat(id)
        }))

    } catch (e) {
        console.log(e)
        res.status(status.statusCode.bad).json(status.errorMessage(e))
    }
}

controller.editByid = async (req, res) => {
    try {
        console.log("start")
        let obj = req.body
        await service.updateKaryawan(obj)
        res.status(status.statusCode.success).json(status.successMessage({
            message: "berhasil mengubah data pada nik ".concat(obj.nik)
        }))
    } catch (e){
        console.log(e)
        res.status(status.statusCode.bad).json(status.errorMessage(e))

    }
}

controller.getFLightMule = async (req, res) => {
    try {
        let rs = await api.getFlights()
        let filteredLax = rs.filter((value) =>
            value.destination === 'LAX' && value.plane.type === 'Boeing 777'
        )
        let findingNotLax = rs.find((el) =>
            el.plane.type === 'Boeing 787'
        )
        filteredLax.push(findingNotLax)
        res.status(status.statusCode.success).json(status.successMessage(filteredLax))
    } catch (e) {
        console.log(e)
        res.status(status.statusCode.bad).json(status.errorMessage(e))
    }
}

module.exports = controller;
const controller = {}
const db = require('../config/database')
const query = require('../model/raw-query')
const status = require('../helpers/status-helper')
const model = require('../model/index')
const util = require('../helpers/util')
const { Op } = require('sequelize');
const path = require('path')
// import fs from "fs";

controller.getProduct = async (req, res) => {
    try {
        const response = await model.productModel.findAll()
        res.status(status.statusCode.success).json(status.successMessage(response));

    } catch (error) {
        console.log(error.message);
    }
}

controller.saveProduct = async(req, res) => {
    if(req.files === null) return res.status(400).json({msg: "No File Uploaded"});
    const name = req.query.title;
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = ['.png','.jpg','.jpeg'];
 
    if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid Images"});
    if(fileSize > 5000000) return res.status(422).json({msg: "Image must be less than 5 MB"});
 
    file.mv(`./public/images/${fileName}`, async(err)=>{
        if(err) return res.status(500).json({msg: err.message});
        try {
            await model.productModel.create({name: name, image: fileName, url: url});
            res.status(201).json({msg: "Product Created Successfuly"});
        } catch (error) {
            console.log(error.message);
        }
    })
}

module.exports = controller;
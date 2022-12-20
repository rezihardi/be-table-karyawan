const Sequelize = require("sequelize");
const db = require("../config/database")
const e = require("express");
const model = db.define(
    "Product",
    {
        name: {
            type: Sequelize.STRING(),
            field: "name",
            allowNull: false,
            primaryKey: true,
        },
        image: {
            type: Sequelize.STRING(),
            field: "image",
            allowNull: true,
        },
        url: {
            type: Sequelize.STRING(),
            field: "url",
            allowNull: true,
        }
    },
    {
        tableName: "product",
        freezeTableName: true,
    }
);

module.exports = model;

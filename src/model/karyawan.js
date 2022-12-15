
const Sequelize = require("sequelize");
const db = require("../config/database")
const model = db.define(
    "Karyawan",
    {
        nik: {
            type: Sequelize.BIGINT,
            field: "nik",
            allowNull: false,
            primaryKey: true,
            // autoIncrement: true,
        },
        alamat: {
            type: Sequelize.STRING(255),
            field: "alamat",
            allowNull: true,
        },
        nama: {
            type: Sequelize.STRING(255),
            field: "nama",
            allowNull: true,
        },
    },
    {
        tableName: "karyawan",
        timestamps: false,
    }
);

module.exports = model;
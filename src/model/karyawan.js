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
        //validasi BE
        validate: {
            userValidation() {
                if (this.nama.length < 7) {
                    throw new Error("panjang nama ".concat(this.nama).concat(" harus lebih dari 7 karakter"))
                }
                // if (this.nama.length > 10) {
                //     throw new Error("panjang nama tidak boleh melebihi 10 karakter");
                // }
                if (this.alamat.includes("jalan")) {
                    throw new Error("alamat tidak dapat menggunakan kata jalan")
                }
            },
        },
    }
);

module.exports = model;

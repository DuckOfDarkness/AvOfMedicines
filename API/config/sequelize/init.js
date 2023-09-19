const sequelize = require('./sequelize');

const Wholesaler = require('../../model/sequelize/Wholesaler');
const Wholesaler_Medicines = require('../../model/sequelize/Wholesaler_Medicines');
const Medicines = require('../../model/sequelize/Medicines');
const Producer = require('../../model/sequelize/Producer');
const User = require('../../model/sequelize/User');

const authUtil = require('../../utils/authUtils');
const passHash = authUtil.hashPassword('1');

module.exports = () => {

    Medicines.hasMany(Wholesaler_Medicines, {
        as: 'wholesalerMedicines',
        foreignKey: {name: 'medicines_id', allowNull: false},
        constraints: true,
        onDelete: 'CASCADE'
    });
    Wholesaler_Medicines.belongsTo(Medicines, {
        as: 'medicines',
        foreignKey: {name: 'medicines_id', allowNull: false}
    });

    Producer.hasMany(Medicines, {
        as: 'medicines',
        foreignKey: {name: 'producer_id', allowNull: false},
        constraints: true,
        onDelete: 'CASCADE'
    });
    Medicines.belongsTo(Producer, {
        as: 'producer',
        foreignKey: {name: 'producer_id', allowNull: false}});

    Wholesaler.hasMany(Wholesaler_Medicines, {
        as: 'wholesalerMedicines',
        foreignKey: {name: 'wholesaler_id', allowNull: false},
        constraints: true,
        onDelete: 'CASCADE'
    });
    Wholesaler_Medicines.belongsTo(Wholesaler, {
        as: 'wholesaler',
        foreignKey: {name: 'wholesaler_id', allowNull: false}
    });


    let allWholesalers, allMedicines, allProducers;

    return sequelize
        .sync({force: true})
        .then(() => {
        return Producer.findAll();
    })
        .then(producers => {
            if (!producers || producers.length === 0) {
                return Producer.bulkCreate([
                    {name: "Sandoz", country: "Szwajcaria", password: passHash},
                    {name: "Polfa Rzeszów", country: "Polska", password: passHash}
                ])
                    .then(() => {
                        return Producer.findAll();
                    });
            } else {
                return producers;
            }
        })
        .then(producers =>{
            allProducers = producers;
            return Medicines.findAll();
        })
        .then(medicines => {
            if (!medicines || medicines.length === 0) {
                return Medicines.bulkCreate([
                    {name: "Amlopin", parallel_importer: "InPharm", expiration_date: "2025-12-01", producer_id: 1},
                    {name: "Aspirin", expiration_date: "2025-01-12", producer_id: 1},
                    {name: "Amoksiklav", parallel_importer: "InPharm", expiration_date: "2026-05-23", producer_id: 1},
                    {name: "Bisocard", parallel_importer: null, expiration_date: "2023-02-24", producer_id: 2},
                    {name: "Tasectan", parallel_importer: null, expiration_date: "2023-09-14", producer_id: 2},
                    {name: "Deflegmin", parallel_importer: "InPharm", expiration_date: "2025-07-16", producer_id: 2},
                ])
                    .then(() => {
                        return Medicines.findAll();
                    });
            } else {
                return medicines;
            }
        })
        .then(medicines => {
            allMedicines = medicines;
            return Wholesaler.findAll();
        })
        .then(wholesalers => {
            if (!wholesalers || wholesalers.length === 0) {
                return Wholesaler.bulkCreate([
                    {name: "Farmacol", nip: 6340023629, password: passHash},
                    {name: "Neuca", nip: 8790017162, password: passHash},
                    {name: "PGF", nip: 1986548596, password: passHash}
                ])
                    .then(() => {
                        return Wholesaler.findAll();
                    });
            } else {
                return wholesalers;
            }
        })
        .then(wholesalers => {
            allWholesalers = wholesalers;
            return Wholesaler_Medicines.findAll();
        })
        .then(wholesalers_medicines => {
            if(!wholesalers_medicines || wholesalers_medicines.length === 0){
                return Wholesaler_Medicines.bulkCreate([
                    {medicines_id: 1, wholesaler_id: 1, amount: 34, date_of_purchase: "2022-01-12"},
                    {medicines_id: 2, wholesaler_id: 2, amount: 12, date_of_purchase: "2022-06-24"},
                    {medicines_id: 3, wholesaler_id: 3, amount: 56, date_of_purchase: "2022-08-06"},
                    {medicines_id: 4, wholesaler_id: 1, amount: 3, date_of_purchase: "2021-02-24"},
                    {medicines_id: 5, wholesaler_id: 2, amount: 95, date_of_purchase: "2022-03-17"},
                    {medicines_id: 6, wholesaler_id: 3, amount: 123, date_of_purchase: "2022-04-25"},
                    {medicines_id: 2, wholesaler_id: 1, amount: 17, date_of_purchase: "2021-11-19"}
                ])
                    .then(() =>{
                        return User.findAll();
                    })
            }else{
                return wholesalers_medicines;
            }
        })
        .then(user =>{
            if(!user || user.length === 0){
                return User.bulkCreate([
                    {name: 'Admin', role: "admin", role_id: 1, password: passHash, newPasswd: null},
                    {name: 'Sandoz', role: "producer", role_id: 1, password: passHash, newPasswd: null},
                    {name: 'Polfa Rzeszów', role: "producer", role_id: 2, password: passHash, newPasswd: null},
                    {name: 'Farmacol', role: "wholesaler", role_id: 1, password: passHash, newPasswd: null},
                    {name: 'Neuca', role: "wholesaler", role_id: 2, password: passHash, newPasswd: null},
                    {name: 'PGF', role: "wholesaler", role_id: 3, password: passHash, newPasswd: null},
                ])
            }
        })
};

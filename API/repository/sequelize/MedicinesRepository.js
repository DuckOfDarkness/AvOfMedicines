const Medicines = require('../../model/sequelize/Medicines');
const Wholesaler = require('../../model/sequelize/Wholesaler');
const Producer = require('../../model/sequelize/Producer');
const Wholesaler_Medicines = require('../../model/sequelize/Wholesaler_Medicines');

exports.getMedicines = () => {
   return Medicines.findAll();
};

exports.getMedicinesById = (medicines_id) => {
    return Medicines.findByPk(medicines_id,
        {include: [
                {
                    model: Producer,
                    as: 'producer'
                },
            {
                model: Wholesaler_Medicines,
                as: 'wholesalerMedicines',
                include: [{
                    model: Wholesaler,
                    as: "wholesaler"
                }]
            }]
        });
};

exports.createMedicines = (data) => {
    console.log(JSON.stringify(data));
    return Medicines.create({
        name: data.name,
        parallel_importer: data.parallel_importer,
        expiration_date: data.expiration_date,
        producer_id: data.producer_id
    });
};

exports.updateMedicines = (medicines_id, data) => {
    const name = data.name;
    const parallel_import = data.parallel_importer;
    const expiration_date = data.expiration_date;
    const producer_id = data.producer_id;
    return Medicines.update(data, {where: {_id: medicines_id}});
};

exports.deleteMedicines = (medicines_Id) => {
    return Medicines.destroy({
        where: {
            _id: medicines_Id
        }
    });
}

const Sequelize = require('sequelize');

const Medicines = require('../../model/sequelize/Medicines');
const Wholesaler = require('../../model/sequelize/Wholesaler');
const Producer = require('../../model/sequelize/Producer');
const Wholesaler_Medicines = require('../../model/sequelize/Wholesaler_Medicines');

exports.getWholesaler_Medicines = () => {
    return Wholesaler_Medicines.findAll({include: [
            {
                model: Medicines,
                as: 'medicines'
            },
            {
                model: Wholesaler,
                as: 'wholesaler'
            }
            ]
    });
};

exports.getWholesaler_MedicinesById = (wholesaler_medicines_id) => {
    return Wholesaler_Medicines.findByPk(wholesaler_medicines_id, {include: [
            {
                model: Medicines,
                as: 'medicines',
                include: [{
                    model: Producer,
                    as: 'producer'
                }]
            },
            {
                model: Wholesaler,
                as: 'wholesaler'
            }]
        });
};

exports.createWholesaler_Medicines = (data) => {
    console.log(JSON.stringify(data));
    return Wholesaler_Medicines.create({
        medicines_id: data.medicines_id,
        wholesaler_id: data.wholesaler_id,
        amount: data.amount,
        date_of_purchase: data.date_of_purchase
    });
};

exports.updateWholesaler_Medicines = (wholesaler_Medicines_id, data) => {
    const medicine_id = data.medicines_id;
    const wholesaler_id = data.wholesaler_id;
    const amount = data.amount;
    const date_of_purchase = data.date_of_purchase;
    return Wholesaler_Medicines.update(data, {where: {_id: wholesaler_Medicines_id}});
}

exports.deleteWholesaler_Medicines = (wholesaler_MedicinesId) => {
    return Wholesaler_Medicines.destroy({
        where: {_id: wholesaler_MedicinesId}
    });
}

exports.deleteManyWholesaler_Medicines = (wholesaler_MedicinesIds) => {
    return Wholesaler_Medicines.find({_id: {[Sequelize.Op.in]: wholesaler_MedicinesIds}})
}
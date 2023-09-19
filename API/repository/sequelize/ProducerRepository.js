const Medicines = require('../../model/sequelize/Medicines');
const Producer = require('../../model/sequelize/Producer');
const User = require('../../model/sequelize/User');
const sequelize = require("../../config/sequelize/sequelize");
const {Sequelize, where} = require("sequelize");
const {hashPassword} = require("../../utils/authUtils");

exports.getProducer = () => {
    return Producer.findAll();
};

exports.getProducerById = (producer_id) => {
    return Producer.findByPk(producer_id,
        {
            include: [
                {
                    model: Medicines,
                    as: 'medicines'
                }]
        }
    );
};

exports.createProducer = (data) => {
    return Producer.create({
        name: data.name,
        country: data.country
    })
        .then(result => {
            return User.create({
                name: result.name,
                role: 'producer',
                role_id: result._id,
                // password: hashPassword(data.password)
                password: data.password
            })
        })
};

exports.updateProducer = (producer_id, data) => {
    return Producer.update(data, {where: {_id: producer_id}})
        .then(() => {
            User.update(
                {
                    name: data.name,
                    password: data.password
                },
                {
                    where: {role: 'producer', role_id: producer_id}
                }
            );
        })
};

exports.deleteProducer = (producer_Id) => {
    return Producer.destroy({
        where: {
            _id: producer_Id
        }
    })
        .then(() =>{
            return User.destroy({
                where:{
                    role: 'producer',
                    role_id: producer_Id
                }
            });
        });
}

exports.findLastAddedId = () => {
    let foundProducer = Producer.findOne({
        order: [['_id', 'DESC']],
    });
    return foundProducer._id
}

const Medicines = require('../../model/sequelize/Medicines');
const Producer = require('../../model/sequelize/Producer');
const Wholesaler = require('../../model/sequelize/Wholesaler');
const Wholesaler_Medicines = require('../../model/sequelize/Wholesaler_Medicines');
const User = require('../../model/sequelize/User');
const {hashPassword} = require("../../utils/authUtils");

exports.getWholesaler = () => {
   return Wholesaler.findAll();
};

exports.getWholesalerById = (wholesaler_id) => {
    return Wholesaler.findByPk(wholesaler_id,
        {include: [
            {
                model: Wholesaler_Medicines,
                as: 'wholesalerMedicines',
                include: [{
                    model: Medicines,
                    as: 'medicines',
                    include: [{
                        model: Producer,
                        as: 'producer'
                    }]
                }]
            }]
        }
        );
};

exports.createWholesaler = (data) => {
    console.log(JSON.stringify(data));
    return Wholesaler.create({
        name: data.name,
        nip: data.nip
    })
        .then(result =>{
            return User.create({
                name: result.name,
                role: 'wholesaler',
                role_id: result._id,
                password: hashPassword(data.password)
            })
        })
};

exports.updateWholesaler = (wholesaler_id, data) => {
    return Wholesaler.update(data, {where: {_id: wholesaler_id}})
        .then(() => {
           return User.update(
                {
                    name: data.name
                },
                {
                    where: {role: 'wholesaler', role_id: wholesaler_id}
                }
            );
        })
};

exports.deleteWholesaler = (wholesaler_id) => {
    return Wholesaler.destroy({
        where: {
            _id: wholesaler_id
        }
    })
        .then(() =>{
            return User.destroy({
                where:{
                    role: 'wholesaler',
                    role_id: wholesaler_id
                }
            });
        });
}

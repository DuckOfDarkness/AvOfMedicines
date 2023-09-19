const Wholesaler = require('../../model/sequelize/Wholesaler');
const Producer = require('../../model/sequelize/Producer');
const User = require('../../model/sequelize/User');
const sequelize = require("../../config/sequelize/sequelize");
const {Sequelize} = require("sequelize");
const {getUsersById} = require("../../api/UserAPI");

exports.getUsers = () => {
    return User.findAll();
};

exports.getUserById = (userId) => {
    return User.findByPk(userId);
};

exports.createUser = (data) => {
    console.log(JSON.stringify(data));
    return User.create({
        name: data.name,
        role: data.role
    });
};

exports.createAdmin = (data) => {
    console.log(JSON.stringify(data));
    return User.create(data);
};

exports.updateUser = (user_id, data) => {
    return User.update(data, {where: {_id: user_id}});
};

exports.deleteUser = (user_id) => {
    return User.destroy({
        where: {
            _id: user_id
        }
    });
}

exports.deleteAdmin = (user_id) => {
    console.log("~~~~~~~~~~~~~~~~~~~~~~~d e l e t e   a d m i n~~~~~~~~~~~~~~~~~~~~~~~~~~")

    return User.destroy({
        where: {
            role: 'admin',
            role_id: user_id
        }
    });
}

exports.findByName = (name) => {
    return User.findOne({
        where: {name: name}
    });
}

exports.findById = (id) => {
    return User.findOne({
        where: {_id: id}
    });
}

// exports.findMaxId = () => {
//     return User.findOne({
//         order: [['role_id', 'DESC']],
//         where: {role: 'admin'}
//     });
// }

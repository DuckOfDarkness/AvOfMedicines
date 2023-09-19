const UserRepository = require('../repository/sequelize/UserRepository');
const {getUserById} = require("../repository/sequelize/UserRepository");
const ProducerRepository = require("../repository/sequelize/ProducerRepository");
const WholesalerRepository = require("../repository/sequelize/WholesalerRepository");
const AuthController = require("../controllers/authController")

exports.getUsers = (req, res, next) => {
    UserRepository.getUsers()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            console.log(err)
        });
};

exports.getUsersById = (req, res, next) => {
    const user_id = req.params.user_id;
    UserRepository.getUserById(user_id)
        .then(user => {
            if (!user) {
                res.status(404).json({
                    message: 'User with id: ' + user_id + ' not found'
                })
            } else {
                res.status(200).json(user);
            }
        });
};

exports.createUser = (req, res, next) => {
    UserRepository.createUser(req.body)
        .then(newObj => {
            res.status(201).json(newObj);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateUser = (req, res, next) => {
    const user_id = req.params.user_id;
    UserRepository.updateUser(user_id, req.body)
        .then(result => {
            res.status(200).json({message: 'User updated!', user: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

// exports.deleteAdmin = (req, res, next) => {
//     const user_id = req.params.user_id;
//     return UserRepository.deleteUser(user_id)
//         .then(()=>{
//             res.redirect('/login?message=' + message);
//         })
// }


exports.deleteUser = (req, res, next) => {
    const user_id = req.params.user_id;
    let user_founded;
    UserRepository.findById(user_id)
        .then(user_found => {
            user_founded = user_found;
            console.log(user_founded)
            if (user_found.role === 'producer') {
                return ProducerRepository.deleteProducer(user_found.role_id)
            } else if (user_found.role === 'wholesaler') {
                return WholesalerRepository.deleteWholesaler(user_found.role_id)
            } else if (user_found.role === 'admin') {
                return UserRepository.deleteAdmin(user_found.role_id)
            }
        })
        .then(result => {
            res.status(200).json({message: 'Removed user', user: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
    // .then(() => {
    //     if (req.session.loggedUser._id !== undefined && user_founded._id !== req.session.loggedUser._id) {
    //         return UserRepository.deleteUser(user_id)
    //     }
    // })
    // .then(() => {
    //     let message = req.__('various.delete.user_delete')
    //     res.redirect('/login?message=' + message);
    // })
};

// UserRepository.findById(user_id)
//     .then(user_found => {
//         user_founded = user_found;
//         if (user_found.role === 'producer') {
//             return ProducerRepository.deleteProducer(user_found.role_id)
//         } else if (user_found.role === 'wholesaler') {
//             return WholesalerRepository.deleteWholesaler(user_found.role_id)
//         }
//     })
//     .then(() => {
//         if (user_founded._id !== req.session.loggedUser._id) {
//             return UserRepository.deleteUser(user_id)
//         }
//     })
//     .then(() => {
//         UserRepository.deleteUser(user_id)
//             .then(result => {
//                 res.status(200).json({message: 'Removed user', user: result});
//             })
//             .catch(err => {
//                 if(!err.statusCode){
//                     err.statusCode = 500;
//                 }
//                 next(err);
//             });
//     })



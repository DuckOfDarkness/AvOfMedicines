const UserRepository = require('../repository/sequelize/UserRepository');
const ProducerRepository = require('../repository/sequelize/ProducerRepository');
const WholesalerRepository = require('../repository/sequelize/WholesalerRepository');
const authUtil = require('../utils/authUtils');
const User = require("../repository/sequelize/UserRepository");
const {hashPassword} = require("../utils/authUtils");
const loggedUser = require("ejs");

exports.showUsersList = (req, res, next) => {
    let allProducer, allWholesaler;
    let message = req.query.message;
    ProducerRepository.getProducer()
        .then(producer => {
            allProducer = producer;
            return WholesalerRepository.getWholesaler()
        })
        .then(wholesaler => {
            allWholesaler = wholesaler;
            return UserRepository.getUsers()
        })
        .then(users => {
            res.render('login', {
                users: users,
                producers: allProducer,
                wholesalers: allWholesaler,
                formMode: 'showList',
                navLocation: 'log',
                formAction: '',
                validationErrors: [],
                message: message
            });
        });
};

exports.showEditUser = (req, res, next) => {
    const userId = req.params.userId;
    let message = req.query.message;
    let users;
    UserRepository.getUsers()
        .then(usr => {
            users = usr
            return UserRepository.getUserById(userId)
        })
        .then(user => {
            res.render('login', {
                user: user,
                formMode: 'edit',
                navLocation: 'log',
                formAction: '',
                validationErrors: [],
                message: message,
                users: users
            });
        });
};

exports.showEditPassword = (req, res, next) => {
    const userId = req.params.userId;
    let message = req.query.message;
    let users;
    UserRepository.getUsers()
        .then(usr => {
            users = usr
            return UserRepository.getUserById(userId)
        })
        .then(user => {
            res.render('login', {
                user: user,
                formMode: 'changePassword',
                navLocation: 'log',
                formAction: '',
                validationErrors: [],
                message: message,
                users: users
            });
        });
};

exports.showAddAdmin = (req, res, next) => {
    UserRepository.getUsers()
        .then(usr => {
            res.render('login', {
                formMode: 'addAdmin',
                navLocation: 'log',
                formAction: '',
                validationErrors: [],
                users: usr,
                message: null
            })
        })
}

// exports.addAdmin = (req, res, next) => {
//     const adminData = {...req.body};
//     let maxId;
//     return UserRepository.findMaxId()
//         .then(res => {
//             maxId = parseInt(res.role_id) +1
//             console.log("~~~~~~~~~~~~~~~~~~~~~~(res._id)~: "+res._id)
//             return UserRepository.createAdmin(
//                 {
//                     name: adminData.name,
//                     role: 'admin',
//                     role_id: (res._id)+1,
//                     password: hashPassword(adminData.password)
//                 })
//         })
//         .then(() => {
//             res.redirect('/login');
//         });
// }

exports.addAdmin = (req, res, next) => {
    const adminData = {...req.body};
    let allUser, count = 0;
    UserRepository.getUsers()
        .then(re => {
            allUser = re
            for (let l of re) {
                if (l.role === 'admin') {
                    count = count + 1;
                }
            }
            return UserRepository.createAdmin(
                {
                    name: adminData.name,
                    role: 'admin',
                    role_id: count + 1,
                    password: hashPassword(adminData.password)
                })
        })
        .then(() => {
            let message = req.__('account.add_admin_successful')
            res.redirect('/login?message='+message);
        });
}


// exports.updateUser = (req, res, next) => {
//     const user_id = req.params.user_id;
//     const userData = {...req.body};
//     UserRepository.getUserById(user_id)
//         .then(user => {
//             if (user.password === userData.password) {
//                 if (user.name === userData.name) {
//                     res.redirect('/login');
//                 } else {
//                     UserRepository.updateUser(user_id, {
//                         name: userData.name
//                     })
//                         .then(() => {
//                             res.redirect('/login');
//
//                         })
//                         .catch(err => {
//                             res.render('login', {
//                                 users: userData,
//                                 formMode: 'edit',
//                                 navLocation: 'log',
//                                 formAction: '',
//                                 validationErrors: [],
//                                 message: null
//                             });
//                         });
//                 }
//             } else {
//                 UserRepository.updateUser(user_id, {
//                     name: userData.name,
//                     password: hashPassword(userData.password)
//                 })
//                     .then(() => {
//                         let message = req.__('account.user_update_message')
//                         req.session.loggedUser = undefined;
//                         res.redirect('/login?message=' + message);
//                     })
//                     .catch(err => {
//                         res.render('login', {
//                             users: userData,
//                             formMode: 'edit',
//                             navLocation: 'log',
//                             formAction: '',
//                             validationErrors: [],
//                             message: null
//                         });
//                     });
//             }
//         });
// }

exports.updatePassword = (req, res, next) => {
    const user_id = req.params.user_id;
    const userData = {...req.body};
    UserRepository.getUserById(user_id)
        .then(user => {
            console.log("stare haslo: " + user.password)
            console.log("nowe haslo: " + hashPassword(userData.password))
            if (user.password === hashPassword(userData.password)) {
                if (user.password === hashPassword(userData.newPasswd)) {
                    let message = req.__('account.same_password')
                    res.redirect('/login?message=' + message);
                } else {
                    UserRepository.updateUser(user_id, {
                        password: hashPassword(userData.newPasswd)
                    })
                        .then(() => {
                            let message = req.__('account.user_update_message')
                            req.session.loggedUser = undefined;
                            res.redirect('/login?message=' + message);
                        })
                        .catch(err => {
                            res.render('login', {
                                users: userData,
                                formMode: 'edit',
                                navLocation: 'log',
                                formAction: '',
                                validationErrors: [],
                                message: null
                            });
                        });
                }
            } else {
                let message = req.__('account.wrong_password')
                res.redirect('/login?message=' + message);
            }
        })
}

exports.updateLoginUser = (req, res, next) => {
    const user_id = req.params.user_id;
    const userData = {...req.body};
    UserRepository.getUserById(user_id)
        .then(user => {
            if (user.name === userData.name) {
                res.redirect('/login');
            } else {
                UserRepository.updateUser(user_id, {
                    name: userData.name
                })
                    .then(() => {
                        res.redirect('/login');

                    })
                    .catch(err => {
                        res.render('login', {
                            users: userData,
                            formMode: 'edit',
                            navLocation: 'log',
                            formAction: '',
                            validationErrors: [],
                            message: null
                        });
                    });
            }
        })
}


exports.deleteUser = (req, res, next) => {
    const user_id = req.params.user_id;
    let user_founded;
    UserRepository.findById(user_id)
        .then(user_found => {
            user_founded = user_found;
            if (user_found.role === 'producer') {
                return ProducerRepository.deleteProducer(user_found.role_id)
            } else if (user_found.role === 'wholesaler') {
                return WholesalerRepository.deleteWholesaler(user_found.role_id)
            }else if(user_found.role === 'admin'){
                return UserRepository.deleteAdmin(user_founded.role_id)
            }
        })
        // .then(() => {
        //     if (req.session.loggedUser._id !== undefined && user_founded._id !== req.session.loggedUser._id) {
        //         return UserRepository.deleteUser(user_id)
        //     }
        // })
        .then(() => {
            let message = req.__('various.delete.user_delete')
            res.redirect('/login?message=' + message);
        })
};

exports.login = (req, res, next) => {
    const name = req.body.name;
    const password = req.body.password;
    let message = req.query.message;
    UserRepository.findByName(name)
        .then(user => {
            if (!user) {
                res.render('login', {
                    navLocation: 'log',
                    loginError: req.__('errors.loginFailed'),
                    message: message
                })
            } else if (authUtil.comparePassword(password, user.password) === true) {
                req.session.loggedUser = user;
                res.redirect('/login/');
            } else {
                res.render('login', {
                    navLocation: 'log',
                    loginError: req.__('errors.loginFailed'),
                    message: message
                })
            }
        })
        .catch(err => {
            console.log(err);
        });
}

exports.logout = (req, res, next) => {
    let message = req.__('account.logout_message')
    req.session.loggedUser = undefined;
    res.redirect('/login?message=' + message);
}
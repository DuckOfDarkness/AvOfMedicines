const UserRepository = require('../repository/sequelize/UserRepository');
const config = require("../config/auth/key")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


exports.login = (req, res) => {
    const error = req.__('errors.loginFailed')

    const name = req.body.name
    const password = req.body.password
    UserRepository.findByName(name)
        .then(user => {
            if (!user) {
                return res.status(401).send({message: error})
            }
            bcrypt.compare(password, user.password)
                .then(isEqual => {
                    if (!isEqual) {
                        return res.status(401).send({message: error})
                    }
                    const token = jwt.sign(
                        {
                            userId: user._id,
                            role: user.role,
                            roleId: user.role_id,
                            username: user.name
                        },
                        config.secret,
                        {expiresIn: '1h'}
                    )
                    res.status(200).json({token: token, userId: user._id, role: user.role,  roleId: user.role_id, username: user.name})
                })
                .catch(err => {
                    console.log(err)
                    res.status(501)
                })
        })
}


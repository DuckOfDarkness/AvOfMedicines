const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');
const {validator} = require("sequelize/lib/utils/validator-extras");
const {hashPassword} = require("../../utils/authUtils");

const User = sequelize.define('User', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            whetherTheFirstCharacterIsEmptyOrIsCapitalLetter(value) {
                if (validator.isEmpty(String(this.name))) {
                    throw new Error("Pole wymagane")
                } else if (!(/^[A-Z]/.test(this.name.charAt(0)))) {
                    throw new Error("Nazwa musi zaczynać się z dużej litery")
                }
            },
            len: {
                args: [2, 90],
                msg: "Nazwa musi zawierać od 2 do 90 znaków"
            },
        }
    },
    role: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    role_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: {
                min: 8,
                msg: "Haslo musi mieć minimum 8 znaków"
            },
            // passwordCompare(oldPasswd){
            //     if(this.password !== hashPassword(oldPasswd)){
            //         throw new Error("Stare hasło jest niepoprawne")
            //     }
            // }
        }
    },
    newPasswd:{
        type: Sequelize.STRING,
        allowNull: true,
    }
});

module.exports = User;
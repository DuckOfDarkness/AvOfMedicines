const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');
const {validator} = require("sequelize/lib/utils/validator-extras");

const Wholesaler = sequelize.define('Wholesaler', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            len: {
                args: [2, 70],
                msg: "Nazwa musi zawierać od 2 do 70 znaków"
            },
            whetherTheStringIsEmptyOrContainsOnlyNumbers(value) {
                if(validator.isEmpty(String(this.name))){
                    throw new Error("Pole jest wymagane")
                }
                else if (!isNaN(this.name)) {
                    throw new Error("Nazwa nie może zawierać samych cyfr")
                }
            },
            whetherTheFirstLetterIsLowercase(value) {
                if (/^[a-z]/.test(this.name)) {
                    throw new Error("Nazwa musi zaczynać się z dużej litery")
                }
            },
        }
    },
    nip: {
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [10, 10],
                msg: "NIP musi zawierać 10 cyfr"
            },
            isNumeric:{
                msg: "NIP może zawierać tylko cyfry"
            }
        }
    }
});

module.exports = Wholesaler;
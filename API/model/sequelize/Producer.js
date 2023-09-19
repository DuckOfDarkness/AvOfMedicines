const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');
const {validator} = require("sequelize/lib/utils/validator-extras");

const Producer = sequelize.define('Producer', {
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
    country: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [2, 100],
                msg: "Kraj musi zawierać od 2 do 90 znaków"
            },
            countryNameValidation(value) {
                if (validator.isEmpty(String(this.country))) {
                    throw new Error("Pole wymagane")
                }
                if (!((/^[A-Z][a-z]+( [A-Z][a-z]+)*$/.test(this.country)))) {
                    throw new Error("Kraj musi zaczynać się z dużej litery i nie może zawierać cyfr ani innych znaków (np. Polska, Wielka Brytania)")
                }
            },
        }
    }
});

module.exports = Producer;
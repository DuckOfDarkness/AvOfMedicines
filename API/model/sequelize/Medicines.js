const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');
const {validator} = require("sequelize/lib/utils/validator-extras");
const i18n = require("i18n")

const Medicines = sequelize.define('Medicines', {
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
                if(validator.isEmpty(String(this.name))){
                    throw new Error("Pole wymagane")
                }else if (!(/^[A-Z]/.test(this.name.charAt(0)))) {
                        throw new Error("Nazwa musi zaczynać się z dużej litery")
                    }
            },
            len: {
                args: [2, 90],
                msg: "Nazwa musi zawierać od 2 do 90 znaków"
            },
        }
    },
    parallel_importer: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
            wrongLengthOrFirstCharacterIsNotCapitalLetter(value) {
                if ((!validator.isEmpty(String(this.parallel_importer)))) {
                    if(this.parallel_importer.length < 2 || this.parallel_importer.length > 100){
                        throw new Error("Importer równoległy może być pusty lub zawierać od 2 do 100 znaków")
                    }if (!(/^[A-Z]/.test(this.parallel_importer.charAt(0)))) {
                        throw new Error("Importer równoległy musi zaczynać się z dużej litery")
                    }
                }
            },
        }
    },
    expiration_date: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            whetherTheDateIsBeforeThanTheCurrentDate(value) {
                if (validator.isEmpty(String(this.expiration_date))) {
                    throw new Error("Pole jest wymagane")
                } else {
                    if (this.expiration_date < Date.now()) {
                        throw new Error("Data ważności nie może być wcześniejsza niż aktualna");
                    }
                }
            },
            invalidDateFormat(value) {
                if (this.expiration_date.getFullYear() > 9999) {
                    throw new Error("Wprowadzono błędny format daty. Data powinna być w formacie dd.MM.rrrrr (np. 02.11.2023).")
                }
            }
        }
    },
    producer_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            min: {
                args: 1,
                msg: "Pole jest wymagane"
            },
        }
    }
});

module.exports = Medicines;
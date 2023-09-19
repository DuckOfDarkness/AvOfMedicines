const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Wholesaler_Medicines = sequelize.define('Wholesaler_Medicines', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    medicines_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            min: {
                args: 1,
                msg: "Pole jest wymagane"
            },
        }
    },
    wholesaler_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            min: {
                args: 1,
                msg: "Pole jest wymagane"
            }
        }
    },
    amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            min: {
                args: 1,
                msg: "Wartość nie może być niższa niż 1"
            },
            max:{
                args: 9999,
                msg: "Wartość nie może być wyższa niż 9999"
            }
        }
    },
    date_of_purchase: {
        type: Sequelize.DATE,
        allowNull: false,
        validate:{
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            whetherTheDateIsAfterThanTheCurrentDate(value){
                if(this.date_of_purchase > new Date()){
                    throw new Error("Data zakupu nie może być późniejsza niż aktualna");
                }
            }
        }
    }
});

module.exports = Wholesaler_Medicines;
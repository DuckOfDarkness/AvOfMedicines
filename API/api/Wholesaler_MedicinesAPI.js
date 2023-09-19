const Wholesaler_MedicinesRepository = require('../repository/sequelize/Wholesaler_MedicinesRepository');

exports.getWholesaler_Medicines = (req, res, next) => {
    Wholesaler_MedicinesRepository.getWholesaler_Medicines()
        .then(wholesaler_medicines => {
            res.status(200).json(wholesaler_medicines);
        })
        .catch(err => {
            console.log(err)
        });
};

exports.getWholesaler_MedicinesById = (req, res, next) => {
    const wholesaler_medicines_Id = req.params.wholesaler_medicines_id;
    Wholesaler_MedicinesRepository.getWholesaler_MedicinesById(wholesaler_medicines_Id)
        .then(wholesaler_medicines => {
            if(!wholesaler_medicines){
                res.status(404).json({
                    message: 'Wholesaler_Medicines with id: '+wholesaler_medicines_Id+' not found'
                })
            }else{
                res.status(200).json(wholesaler_medicines);
            }
        });
};

exports.createWholesaler_Medicines = (req, res, next) => {
    Wholesaler_MedicinesRepository.createWholesaler_Medicines(req.body)
        .then(newObj => {
            res.status(201).json(newObj);
        })
        .catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateWholesaler_Medicines = (req, res, next) => {
    const wholesaler_medicines_Id = req.params.wholesaler_medicines_id;
    Wholesaler_MedicinesRepository.updateWholesaler_Medicines(wholesaler_medicines_Id, req.body)
        .then(result => {
            res.status(200).json({message: 'Wholesaler_Medicines updated!', wholesaler_medicines: result});
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteWholesaler_Medicines = (req, res, next) => {
    const wholesaler_medicines_Id = req.params.wholesaler_medicines_id;
    Wholesaler_MedicinesRepository.deleteWholesaler_Medicines(wholesaler_medicines_Id)
        .then(result => {
            res.status(200).json({message: 'Removed wholesaler_medicines', wholesaler_medicines: result});
        })
        .catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteManyWholesaler_Medicines = (req, res, next) => {
    const wholesaler_medicines_Ids = req.params.wholesaler_medicines_Ids;
    Wholesaler_MedicinesRepository.deleteManyWholesaler_Medicines(wholesaler_medicines_Ids)
        .then(result => {
            res.status(200).json({message: 'Removed wholesaler_medicines', wholesaler_medicines: result});
        })
        .catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });
};



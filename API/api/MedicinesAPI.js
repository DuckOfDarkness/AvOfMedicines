const MedicinesRepository = require('../repository/sequelize/MedicinesRepository');

exports.getMedicines = (req, res, next) => {
    MedicinesRepository.getMedicines()
        .then(medicines => {
            res.status(200).json(medicines);
        })
        .catch(err => {
            console.log(err)
        });
};

exports.getMedicinesById = (req, res, next) => {
    const medicines_Id = req.params.medicines_Id;
    MedicinesRepository.getMedicinesById(medicines_Id)
        .then(medicines => {
            if(!medicines){
                res.status(404).json({
                    message: 'Medicines with id: '+medicines_Id+' not found'
                })
            }else{
                res.status(200).json(medicines);
            }
        });
};

exports.createMedicines = (req, res, next) => {
    MedicinesRepository.createMedicines(req.body)
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

exports.updateMedicines = (req, res, next) => {
    const medicines_Id = req.params.medicines_Id;
    MedicinesRepository.updateMedicines(medicines_Id, req.body)
        .then(result => {
            res.status(200).json({message: 'Medicines updated!', medicines: result});
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteMedicines = (req, res, next) => {
    const medicines_Id = req.params.medicines_Id;
    MedicinesRepository.deleteMedicines(medicines_Id)
        .then(result => {
            res.status(200).json({message: 'Removed medicines', medicines: result});
        })
        .catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });
};

const Wholesaler_MedicinesRepository = require("../repository/sequelize/Wholesaler_MedicinesRepository")
const WholesalerRepository = require("../repository/sequelize/WholesalerRepository")
const MedicineRepository = require("../repository/sequelize/MedicinesRepository");

exports.showWholesaler_MedicinesList = (req, res, next) => {
    let message = req.query.message;
    Wholesaler_MedicinesRepository.getWholesaler_Medicines()
        .then(whole_med => {
            res.render('pages/Wholesaler_Medicines/list', {
                whole_med: whole_med,
                navLocation: 'whole_med',
                message: message
            });
        });
}

exports.showWholesaler_MedicinesDetails = (req, res, next) => {
    const wholesaler_medicinesId = req.params.wholesaler_medicinesId;
    let allMedicines, allWholesaler;
    Wholesaler_MedicinesRepository.getWholesaler_Medicines()
        .then(w_m => {
            return MedicineRepository.getMedicines();
        })
        .then(medicines => {
            allMedicines = medicines;
            return WholesalerRepository.getWholesaler();
        })
        .then(wholesaler => {
            allWholesaler = wholesaler;
            return Wholesaler_MedicinesRepository.getWholesaler_MedicinesById(wholesaler_medicinesId);
        })
        .then(whole_med => {
            res.render('pages/Wholesaler_medicines/form', {
                allMedicines: allMedicines,
                allWholesaler: allWholesaler,
                whole_med: whole_med,
                formMode: 'showDetails',
                pageTitle: req.__('whole-med.form.details.title'),
                formAction: '',
                navLocation: 'whole_med',
                validationErrors: []
            });
        });
};

exports.showEditWholesaler_MedicinesForm = (req, res, next) => {
    const wholesaler_medicinesId = req.params.wholesaler_medicinesId;
    let allMedicines, allWholesaler;
    Wholesaler_MedicinesRepository.getWholesaler_Medicines()
        .then(w_m => {
            return MedicineRepository.getMedicines();
        })
        .then(medicines => {
            allMedicines = medicines;
            return WholesalerRepository.getWholesaler();
        })
        .then(wholesaler => {
            allWholesaler = wholesaler;
            return Wholesaler_MedicinesRepository.getWholesaler_MedicinesById(wholesaler_medicinesId);
        })
        .then(whole_med => {
            res.render('pages/Wholesaler_medicines/form', {
                allMedicines: allMedicines,
                allWholesaler: allWholesaler,
                whole_med: whole_med,
                formMode: 'edit',
                pageTitle: req.__('whole-med.form.edit.title'),
                btnLabel: req.__('account.confirm'),
                formAction: '/wholesaler_medicines/edit',
                navLocation: 'whole_med',
                validationErrors: []
            });
        });
};


exports.showAddWholesaler_MedicinesForm = (req, res, next) => {
    const wholesaler_medicinesId = req.params.wholesaler_medicinesId;
    let allMedicines, allWholesaler;
    Wholesaler_MedicinesRepository.getWholesaler_Medicines()
        .then(w_m => {
            return MedicineRepository.getMedicines();
        })
        .then(medicines => {
            allMedicines = medicines;
            return WholesalerRepository.getWholesaler();
        })
        .then(wholesaler => {
            allWholesaler = wholesaler;
            return Wholesaler_MedicinesRepository.getWholesaler_MedicinesById(wholesaler_medicinesId);
        })
        .then(whole_med => {
            res.render('pages/Wholesaler_medicines/form', {
                allMedicines: allMedicines,
                allWholesaler: allWholesaler,
                whole_med: {},
                formMode: 'createNew',
                pageTitle: req.__('whole-med.list.addTitle'),
                btnLabel: req.__('whole-med.list.btnLabel'),
                formAction: '/wholesaler_medicines/add',
                navLocation: 'whole_med',
                validationErrors: []
            });
        });
};


exports.addWholesaler_Medicines = (req, res, next) => {
    const wholesaler_medicinesData = {...req.body};
    let allMedicines, allWholesaler;
    MedicineRepository.getMedicines()
        .then(medicines => {
            allMedicines = medicines;
            return WholesalerRepository.getWholesaler()
        })
        .then(wholesaler => {
            allWholesaler = wholesaler;
            return Wholesaler_MedicinesRepository.createWholesaler_Medicines(wholesaler_medicinesData)
        })
        .then(result => {
            let message = req.__('various.add.whole_med_add')
            res.redirect('/wholesaler_medicines?message='+message)
        })
        .catch(err => {
            res.render('pages/Wholesaler_medicines/form', {
                allMedicines: allMedicines,
                allWholesaler: allWholesaler,
                whole_med: wholesaler_medicinesData,
                formMode: 'createNew',
                pageTitle: req.__('whole-med.list.addTitle'),
                btnLabel: req.__('whole-med.list.btnLabel'),
                formAction: '/wholesaler_medicines/add',
                navLocation: 'whole_med',
                validationErrors: err.errors
            });
        });
};

exports.updateWholesaler_Medicines = (req, res, next) => {
    const wholesaler_medicinesData = {...req.body};
    const wholesaler_medicineId = req.params.wholesaler_medicinesId;
    let allMedicines, allWholesaler;
    MedicineRepository.getMedicines()
        .then(medicines => {
            allMedicines = medicines;
            return WholesalerRepository.getWholesaler()
        })
        .then(wholesaler => {
            allWholesaler = wholesaler;
             return Wholesaler_MedicinesRepository.updateWholesaler_Medicines(wholesaler_medicineId, wholesaler_medicinesData)
        })
        .then(result => {
            let message = req.__('various.update.whole_med_update')
            res.redirect('/wholesaler_medicines?message='+message)
        })
        .catch(err => {
            res.render('pages/Wholesaler_medicines/form', {
                allMedicines: allMedicines,
                allWholesaler: allWholesaler,
                whole_med: wholesaler_medicinesData,
                formMode: 'edit',
                pageTitle: req.__('whole-med.form.edit.title'),
                btnLabel: req.__('account.confirm'),
                formAction: '/wholesaler_medicines/edit',
                navLocation: 'whole_med',
                validationErrors: err.errors
            });
        });
};

exports.deleteWholesaler_Medicines = (req, res, next) => {
    const wholesaler_medicinesId = req.params.wholesaler_medicinesId;
    const wholesaler_medicinesData = {...req.body};
    Wholesaler_MedicinesRepository.deleteWholesaler_Medicines(wholesaler_medicinesId)
        .then(() => {
            let message = req.__('various.delete.whole_med_delete')
            res.redirect('/wholesaler_medicines?message='+message);
        });
};
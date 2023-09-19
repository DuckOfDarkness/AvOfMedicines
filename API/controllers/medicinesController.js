const MedicinesRepository = require('../repository/sequelize/MedicinesRepository');
const Wholesaler_medicinesRepository = require("../repository/sequelize/Wholesaler_MedicinesRepository");
const ProducerRepository = require("../repository/sequelize/ProducerRepository");

exports.showMedicinesList = (req, res, next) => {
    let allProducer;
    let message = req.query.message;
    ProducerRepository.getProducer()
        .then(producer => {
            allProducer = producer;
            return MedicinesRepository.getMedicines()
                .then(medicines => {
                    res.render('pages/Medicines/list', {
                        allProducer: allProducer,
                        medicines: medicines,
                        navLocation: 'med',
                        message: message
                    });
                });
        });
};

exports.showMedicinesDetails = (req, res, next) => {
    const medicinesId = req.params.medicinesId;
    let allWhole_med, allProducer;
    Wholesaler_medicinesRepository.getWholesaler_Medicines()
        .then(whole_med => {
            allWhole_med = whole_med;
            return ProducerRepository.getProducer()
                .then(producer => {
                    allProducer = producer;
                    return MedicinesRepository.getMedicinesById(medicinesId)
                })
                .then(medicines => {
                    res.render('pages/Medicines/form', {
                        allProducer: allProducer,
                        allWhole_med: allWhole_med,
                        medicines: medicines,
                        formMode: 'showDetails',
                        pageTitle: req.__('medicines.form.details.title'),
                        formAction: '',
                        navLocation: 'med',
                        validationErrors: []
                    });
                });
        });
};

exports.showAddMedicinesForm = (req, res, next) => {
    let allProducer;
    ProducerRepository.getProducer()
        .then(producer => {
            allProducer = producer;
            return MedicinesRepository.getMedicines();
        })
        .then(medicines => {
            res.render('pages/Medicines/form', {
                isInvalid: {},
                allProducer: allProducer,
                medicines: {},
                pageTitle: req.__('medicines.form.details.addTitle'),
                formMode: 'createNew',
                btnLabel: req.__('medicines.form.details.btnLabel'),
                formAction: '/medicines/add',
                navLocation: 'med',
                validationErrors: []
            });
        });
};

exports.showEditMedicinesForm = (req, res, next) => {
    const medicinesId = req.params.medicinesId;
    let allWhole_med, allProducer;
    Wholesaler_medicinesRepository.getWholesaler_Medicines()
        .then(whole_med => {
            allWhole_med = whole_med;
            return ProducerRepository.getProducer()
                .then(producer => {
                    allProducer = producer;
                    return MedicinesRepository.getMedicinesById(medicinesId)
                })
                .then(medicines => {
                    res.render('pages/Medicines/form', {
                        allProducer: allProducer,
                        allWhole_med: allWhole_med,
                        medicines: medicines,
                        formMode: 'edit',
                        pageTitle: req.__('medicines.form.edit.title'),
                        btnLabel: req.__('account.confirm'),
                        formAction: '/medicines/edit',
                        navLocation: 'med',
                        validationErrors: []
                    });
                });
        });
};

exports.addMedicines = (req, res, next) => {
    const medicinesData = {...req.body};
    let allProducer;
    ProducerRepository.getProducer()
        .then(producer => {
            allProducer = producer;
            return MedicinesRepository.createMedicines(medicinesData);
        })
        .then(result => {
            let message = req.__('various.add.medicines_add');
            res.redirect('/medicines?message=' + message)
        })
        .catch(err => {
            res.render('pages/Medicines/form', {
                allProducer: allProducer,
                medicines: medicinesData,
                formMode: 'createNew',
                pageTitle: req.__('medicines.form.details.addTitle'),
                btnLabel: req.__('medicines.form.details.btnLabel'),
                formAction: '/medicines/add',
                navLocation: 'med',
                validationErrors: err.errors
            });
        });
};

exports.updateMedicines = (req, res, next) => {
    const medicinesData = {...req.body};
    const medicinesId = req.params.medicinesId;
    let allProducer, allWhole_med;
    Wholesaler_medicinesRepository.getWholesaler_Medicines()
        .then(whole_med => {
            allWhole_med = whole_med;
            return ProducerRepository.getProducer()
        })
        .then(producer => {
            allProducer = producer;
            return MedicinesRepository.updateMedicines(medicinesId, medicinesData);
        })
        .then(result => {
            let message = req.__('various.update.medicines_update')
            res.redirect('/medicines?message=' + message)
        })
        .catch(err => {
            res.render('pages/Medicines/form', {
                allProducer: allProducer,
                allWhole_med: allWhole_med,
                medicines: medicinesData,
                formMode: 'edit',
                pageTitle: req.__('medicines.form.edit.title'),
                btnLabel: req.__('account.confirm'),
                formAction: '/medicines/edit',
                navLocation: 'med',
                validationErrors: err.errors
            });
        });
};

exports.deleteMedicines = (req, res, next) => {
    const medicinesId = req.params.medicinesId;
    MedicinesRepository.deleteMedicines(medicinesId)
        .then(() => {
            let message = req.__('various.delete.medicine_delete')
            res.redirect('/medicines?message=' + message);
        });
};


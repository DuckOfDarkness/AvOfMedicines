const ProducerRepository = require('../repository/sequelize/ProducerRepository');
const MedicinesRepository = require('../repository/sequelize/MedicinesRepository');
const UserRepository = require('../repository/sequelize/UserRepository');
const Producer = require("sequelize/lib/model");

exports.showProducerList = (req, res, next) => {
    let message = req.query.message;
    ProducerRepository.getProducer()
        .then(producer => {
            res.render('pages/Producer/list', {
                producer: producer,
                navLocation: 'prod',
                message: message
            });
        });
};

exports.showProducerDetails  = (req, res, next) => {
    const producerId = req.params.producerId;
    let allMedicines;
    MedicinesRepository.getMedicines()
        .then(medicines => {
            allMedicines = medicines;
            return ProducerRepository.getProducerById(producerId)
        })
        .then(producer => {
            res.render('pages/Producer/form', {
                medicines: allMedicines,
                producer: producer,
                formMode: 'showDetails',
                pageTitle: req.__('producer.form.details.title'),
                formAction: '',
                navLocation: 'prod',
                validationErrors: []
            });
        });
};

exports.showEditProducerForm  = (req, res, next) => {
    const producerId = req.params.producerId;
    let allMedicines;
    MedicinesRepository.getMedicines()
        .then(medicines => {
            allMedicines = medicines;
            return ProducerRepository.getProducerById(producerId)
        })
        .then(producer => {
            res.render('pages/Producer/form', {
                medicines: allMedicines,
                producer: producer,
                formMode: 'edit',
                pageTitle: req.__('producer.form.edit.title'),
                btnLabel: req.__('account.confirm'),
                formAction: '/producer/edit',
                navLocation: 'prod',
                validationErrors: []
            });
        });
};


exports.showAddProducerForm = (req, res, next) => {
    res.render('pages/Producer/form', {
        producer: {},
        pageTitle: req.__('producer.list.addTitle'),
        btnLabel: req.__('producer.list.btnLabel'),
        formMode: 'createNew',
        formAction: '/producer/add',
        navLocation: 'prod',
        validationErrors: []
    });
};

exports.addProducer = (req, res, next) => {
    const producerData = { ...req.body};
    ProducerRepository.createProducer(producerData)
        .then(() => {
            let message = req.__('various.add.producer_add')
            res.redirect('/producer?message='+message)
        })
        .catch(err => {
            res.render('pages/Producer/form', {
                producer: producerData,
                formMode: 'createNew',
                pageTitle: req.__('producer.list.addTitle'),
                btnLabel: req.__('producer.list.btnLabel'),
                formAction: '/producer/add',
                navLocation: 'prod',
                validationErrors: err.errors
            });
        });
};

exports.updateProducer = (req, res, next) => {
    const producerId = req.params.producerId;
    const producerData = {...req.body};
    let allMedicines;
    MedicinesRepository.getMedicines()
        .then(medicines => {
            allMedicines = medicines;
            return ProducerRepository.updateProducer(producerId, producerData)
        })
        .then(result => {
            let message = req.__('various.update.producer_update')
            res.redirect('/producer?message='+message)
        })
        .catch(err => {
            res.render('pages/Producer/form', {
                producer: producerData,
                medicines: allMedicines,
                formMode: 'edit',
                pageTitle: req.__('producer.form.edit.title'),
                btnLabel: req.__('account.confirm'),
                formAction: '/producer/edit',
                navLocation: 'prod',
                validationErrors: err.errors
            });
        });
};

exports.deleteProducer = (req, res, next) => {
    const producerId = req.params.producerId;
    ProducerRepository.deleteProducer(producerId)
        .then( () => {
            let message = req.__('various.delete.producer_delete')
            res.redirect('/producer?message='+message);
        })
};
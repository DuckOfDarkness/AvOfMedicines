const WholesalerRepository = require("../repository/sequelize/WholesalerRepository");
const Wholesaler_medicinesRepository = require("../repository/sequelize/Wholesaler_MedicinesRepository");

exports.showWholesalerList = (req, res, next) => {
    let message = req.query.message;
    WholesalerRepository.getWholesaler()
        .then(wholesaler => {
            res.render('pages/Wholesaler/list', {
                wholesaler: wholesaler,
                navLocation: 'whole',
                message: message
            });
        });
};

exports.showWholesalerDetails = (req, res, next) => {
    const wholesalerId = req.params.wholesalerId;
    let allWhole_med;
    Wholesaler_medicinesRepository.getWholesaler_Medicines()
        .then(whole_med => {
            allWhole_med = whole_med;
            return WholesalerRepository.getWholesalerById(wholesalerId)
        })
        .then(wholesaler => {
            res.render('pages/Wholesaler/form', {
                allWhole_med: allWhole_med,
                wholesaler: wholesaler,
                formMode: 'showDetails',
                pageTitle: req.__('wholesaler.form.details.title'),
                formAction: '',
                navLocation: 'whole',
                validationErrors: []
            });
        });
};

exports.showEditWholesalerForm = (req, res, next) => {
    const wholesalerId = req.params.wholesalerId;
    let allWhole_med;
    Wholesaler_medicinesRepository.getWholesaler_Medicines()
        .then(whole_med => {
            allWhole_med = whole_med;
            return WholesalerRepository.getWholesalerById(wholesalerId)
        })
        .then(wholesaler => {
            res.render('pages/Wholesaler/form', {
                allWhole_med: allWhole_med,
                wholesaler: wholesaler,
                formMode: 'edit',
                pageTitle: req.__('wholesaler.form.edit.title'),
                btnLabel: req.__('account.confirm'),
                formAction: '/wholesaler/edit',
                navLocation: 'whole',
                validationErrors: []
            });
        });
};



exports.showAddWholesalerForm = (req, res, next) => {
    res.render('pages/Wholesaler/form', {
        wholesaler: {},
        pageTitle: req.__('wholesaler.form.details.addTitle'),
        formMode: 'createNew',
        btnLabel: req.__('wholesaler.form.details.btnLabel'),
        formAction: '/wholesaler/add',
        navLocation: 'whole',
        validationErrors: []
    });
};

exports.addWholesaler = (req, res, next) => {
    const wholesalerData = {...req.body};
    let message = req.__('various.add.wholesaler_add')
    WholesalerRepository.createWholesaler(wholesalerData)
        .then(result => {
            res.redirect('/wholesaler?message='+message)
        })
        .catch(err => {
            res.render('pages/Wholesaler/form', {
                wholesaler: wholesalerData,
                formMode: 'createNew',
                pageTitle: req.__('wholesaler.form.details.addTitle'),
                btnLabel: req.__('wholesaler.form.details.btnLabel'),
                formAction: '/wholesaler/add',
                navLocation: 'whole',
                validationErrors: err.errors
            });
        });
};

exports.updateWholesaler = (req, res, next) => {
    const wholesalerId = req.params.wholesalerId;
    const wholesalerData = {...req.body};
    let allWhole_med;
    Wholesaler_medicinesRepository.getWholesaler_Medicines()
        .then(whole_med =>{
            allWhole_med = whole_med;
            return WholesalerRepository.updateWholesaler(wholesalerId, wholesalerData)
        })
        .then(result => {
            let message = req.__('various.update.wholesaler_update')
            res.redirect('/wholesaler?message='+message);
        })
        .catch(err => {
            res.render('pages/Wholesaler/form', {
                allWhole_med: allWhole_med,
                wholesaler: wholesalerData,
                formMode: 'edit',
                pageTitle: req.__('wholesaler.form.edit.title'),
                btnLabel: req.__('account.confirm'),
                formAction: '/wholesaler/edit',
                navLocation: 'whole',
                validationErrors: err.errors
            });
        });
};

exports.deleteWholesaler = (req, res, next) => {
    const wholesalerId = req.params.wholesalerId;
    const wholesalerData = {...req.body};
    WholesalerRepository.deleteWholesaler(wholesalerId)
        .then(() => {
            let message = req.__('various.delete.wholesaler_delete')
            res.redirect('/wholesaler?message='+message);
        })
        .catch(err => {
            res.render('pages/Wholesaler/form', {
                wholesalerData: wholesalerData,
                pageTitle: req.__('wholesaler.form.details.deleteTitle'),
                formMode: 'delete',
                formAction: '/wholesaler/delete',
                navLocation: 'whole'
            });
        });
};



const WholesalerRepository = require('../repository/sequelize/WholesalerRepository');

exports.getWholesaler = (req, res, next) => {
    WholesalerRepository.getWholesaler()
        .then(wholesaler => {
            res.status(200).json(wholesaler);
        })
        .catch(err => {
            console.log(err)
        });
};

exports.getWholesalerById = (req, res, next) => {
    const wholesaler_Id = req.params.wholesaler_Id;
    WholesalerRepository.getWholesalerById(wholesaler_Id)
        .then(wholesaler => {
            if (!wholesaler) {
                res.status(404).json({
                    message: 'Medicines with id: ' + wholesaler_Id + ' not found'
                })
            } else {
                res.status(200).json(wholesaler);
            }
        });
};

exports.createWholesaler = (req, res, next) => {
    WholesalerRepository.createWholesaler(req.body)
        .then(newObj => {
            res.status(201).json(newObj);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateWholesaler = (req, res, next) => {
    const wholesalerId = req.params.wholesalerId;
    WholesalerRepository.updateWholesaler(wholesalerId, req.body)
        .then(result => {
            res.status(200).json({message: 'Wholesaler updated!', wholesaler: result.message});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteWholesaler = (req, res, next) => {
    const wholesaler_Id = req.params.wholesaler_Id;
    WholesalerRepository.deleteWholesaler(wholesaler_Id)
        .then(result => {
            res.status(200).json({message: 'Removed wholesaler', wholesaler: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

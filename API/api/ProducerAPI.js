const ProducerRepository = require('../repository/sequelize/ProducerRepository');

exports.getProducer = (req, res, next) => {
    ProducerRepository.getProducer()
        .then(producer => {
            res.status(200).json(producer);
        })
        .catch(err => {
            console.log(err)
        });
};


exports.getProducerById = (req, res, next) => {
    const producer_Id = req.params.producer_Id;
    ProducerRepository.getProducerById(producer_Id)
        .then(producer => {
            if (!producer) {
                res.status(404).json({
                    message: 'Producer with id: ' + producer_Id + ' not found'
                })
            } else {
                res.status(200).json(producer);
            }
        });
};

exports.getProducerByName = (req, res, next) => {
    let allProducer;
    ProducerRepository.getProducer()
        .then((res) =>{
            allProducer = res
        })
        .then()
}

exports.createProducer = (req, res, next) => {
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
    console.log(req.body)
    ProducerRepository.createProducer(req.body)
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

exports.updateProducer = (req, res, next) => {
    const producer_Id = req.params.producer_Id;
    ProducerRepository.updateProducer(producer_Id, req.body)
        .then(result => {
            res.status(200).json({message: 'Producer updated!', producer: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteProducer = (req, res, next) => {
    const producer_Id = req.params.producer_Id;
    ProducerRepository.deleteProducer(producer_Id)
        .then(result => {
            res.status(200).json({message: 'Removed producer', producer: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

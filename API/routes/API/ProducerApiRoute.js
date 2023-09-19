const express = require('express');
const router = express.Router();

const producerApiController = require('../../api/ProducerAPI');
const isAuth = require('../../middleware/isAuth');

router.get('/', producerApiController.getProducer);
router.get('/:producer_Id', producerApiController.getProducerById);
router.post('/', isAuth, producerApiController.createProducer);
router.put('/:producer_Id', isAuth, producerApiController.updateProducer);
router.delete('/:producer_Id', isAuth, producerApiController.deleteProducer);

module.exports = router;

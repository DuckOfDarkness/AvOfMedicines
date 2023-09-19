const express = require('express');
const router = express.Router();
const producerController = require('../controllers/producerController');

router.get('/', producerController.showProducerList);
router.get('/add/', producerController.showAddProducerForm);
router.get('/edit/:producerId', producerController.showEditProducerForm);
router.get('/details/:producerId', producerController.showProducerDetails);

router.post('/add', producerController.addProducer);
router.post('/edit/:producerId', producerController.updateProducer);
router.get('/delete/:producerId/', producerController.deleteProducer);

module.exports = router;
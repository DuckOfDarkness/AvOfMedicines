const express = require('express');
const router = express.Router();

const wholesaler_medicinesApiController = require('../../api/Wholesaler_MedicinesAPI');
const isAuth = require('../../middleware/isAuth');


router.get('/', wholesaler_medicinesApiController.getWholesaler_Medicines);
router.get('/:wholesaler_medicines_id', wholesaler_medicinesApiController.getWholesaler_MedicinesById);
router.post('/', isAuth, wholesaler_medicinesApiController.createWholesaler_Medicines);
router.put('/:wholesaler_medicines_id', isAuth, wholesaler_medicinesApiController.updateWholesaler_Medicines);
router.delete('/:wholesaler_medicines_id', isAuth, wholesaler_medicinesApiController.deleteWholesaler_Medicines);

module.exports = router;

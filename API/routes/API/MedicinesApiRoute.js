const express = require('express');
const router = express.Router();

const medicinesApiController = require('../../api/MedicinesAPI');
const isAuth = require('../../middleware/isAuth');

router.get('/', medicinesApiController.getMedicines);
router.get('/:medicines_Id', medicinesApiController.getMedicinesById);
router.post('/', isAuth, medicinesApiController.createMedicines);
router.put('/:medicines_Id', isAuth, medicinesApiController.updateMedicines);
router.delete('/:medicines_Id', isAuth, medicinesApiController.deleteMedicines);

module.exports = router;

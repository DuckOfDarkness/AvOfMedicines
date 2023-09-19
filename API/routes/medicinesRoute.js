const express = require('express');
const router = express.Router();
const medicinesController = require('../controllers/medicinesController');

router.get('/', medicinesController.showMedicinesList);
router.get('/add', medicinesController.showAddMedicinesForm);
router.get('/edit/:medicinesId', medicinesController.showEditMedicinesForm);
router.get('/details/:medicinesId', medicinesController.showMedicinesDetails);

router.post('/add', medicinesController.addMedicines);
router.post('/edit/:medicinesId', medicinesController.updateMedicines);
router.get('/delete/:medicinesId', medicinesController.deleteMedicines);

module.exports = router;
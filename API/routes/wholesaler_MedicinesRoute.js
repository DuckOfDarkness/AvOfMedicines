const express = require('express');
const router = express.Router();
const wholesaler_MedicinesController = require('../controllers/wholesaler_medicinesController.js');

router.get('/', wholesaler_MedicinesController.showWholesaler_MedicinesList);
router.get('/add/', wholesaler_MedicinesController.showAddWholesaler_MedicinesForm);
router.get('/edit/:wholesaler_medicinesId', wholesaler_MedicinesController.showEditWholesaler_MedicinesForm);
router.get('/details/:wholesaler_medicinesId', wholesaler_MedicinesController.showWholesaler_MedicinesDetails);

router.post('/add', wholesaler_MedicinesController.addWholesaler_Medicines);
router.post('/edit/:wholesaler_medicinesId', wholesaler_MedicinesController.updateWholesaler_Medicines);
router.get('/delete/:wholesaler_medicinesId/', wholesaler_MedicinesController.deleteWholesaler_Medicines);

module.exports = router;






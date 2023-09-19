const express = require('express');
const router = express.Router();
const wholesalerController = require('../controllers/wholesalerController');

router.get('/', wholesalerController.showWholesalerList);
router.get('/add/', wholesalerController.showAddWholesalerForm);
router.get('/edit/:wholesalerId', wholesalerController.showEditWholesalerForm);
router.get('/details/:wholesalerId', wholesalerController.showWholesalerDetails);

router.post('/add', wholesalerController.addWholesaler);
router.post('/edit/:wholesalerId', wholesalerController.updateWholesaler);
router.get('/delete/:wholesalerId/', wholesalerController.deleteWholesaler);

module.exports = router;
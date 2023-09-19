const express = require('express');
const router = express.Router();

const wholesalerApiController = require('../../api/WholesalerAPI');

const isAuth = require('../../middleware/isAuth');

router.get('/', wholesalerApiController.getWholesaler);
router.get('/:wholesaler_Id', wholesalerApiController.getWholesalerById);
router.post('/',isAuth, wholesalerApiController.createWholesaler);
router.put('/:wholesaler_Id', isAuth, wholesalerApiController.updateWholesaler);
router.delete('/:wholesaler_Id', isAuth, wholesalerApiController.deleteWholesaler);

module.exports = router;

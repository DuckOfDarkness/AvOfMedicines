var express = require('express');
var router = express.Router();
const AuthController = require('../controllers/authController');
const producerController = require("../controllers/producerController");
const medicinesController = require("../controllers/medicinesController");

router.get('/', AuthController.showUsersList);

router.get('/add', AuthController.showAddAdmin);

router.get('/changeData/:user_id', AuthController.showEditUser);
router.post('/changeData/:user_id', AuthController.updateLoginUser);

router.get('/changePassword/:user_id', AuthController.showEditPassword);
router.post('/changePassword/:user_id', AuthController.updatePassword);

router.get('/delete/:user_id/', AuthController.deleteUser);

router.post('/add', AuthController.addAdmin);
router.post('/login', AuthController.login);
router.get('/logout', AuthController.logout);

module.exports = router;
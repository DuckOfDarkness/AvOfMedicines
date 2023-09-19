const express = require('express');
const router = express.Router();

const userApiController = require('../../api/UserAPI');
const isAuth = require('../../middleware/isAuth');

router.get('/', userApiController.getUsers);
router.get('/:user_id', userApiController.getUsersById);
router.post('/',isAuth, userApiController.createUser);
router.put('/:user_id',isAuth, userApiController.updateUser);
router.delete('/:user_id', isAuth, userApiController.deleteUser);

module.exports = router;

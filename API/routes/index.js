var express = require('express');
const AuthController = require("../controllers/authController");
var router = express.Router();
let navLocation;
const LangController = require('../controllers/LangController');
router.get('/changeLang/:lang', LangController.changeLang);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    navLocation: 'main'
  })
});



module.exports = router;

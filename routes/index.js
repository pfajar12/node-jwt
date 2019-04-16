const express           = require('express');
var router              = express.Router();
const userController    = require('../controllers/userController');
const authController    = require('../controllers/authController');

// users
router.get('/users', userController.getAllData);

// AUTH
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
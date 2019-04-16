const express           = require('express');
var router              = express.Router();
const userController    = require('../controllers/userController');
const authController    = require('../controllers/authController');
var config              = require('../config');
var jwt                 = require('jsonwebtoken');


// AUTH
router.post('/register', authController.register);
router.post('/login', authController.login);
// USERS
router.get('/users', userController.getAllData);

// MIDDLEWARE AUTH
router.use(function(req, res, next){
    var token = req.headers['authorization'];

    if(token){
        jwt.verify(token, config.secret, function(err, decoded){
            if(err){
                return res.json({
                    success: false,
                    message: 'problem with the token'
                })
            }
            else{
                req.decoded = decoded;
                next();
            }
        })
    }
    else{
        return res.status(403).send({
            success: false,
            message: 'You are not authorized'
        });
    }
})

// PROFILE
router.get('/profile', userController.getProfile);

module.exports = router;
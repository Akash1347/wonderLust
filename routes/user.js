const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const wrapAsyc = require('../utils/wrapAsyc.js');
const passport = require('passport');
const {saveRedirectUrl} = require('../middleware.js');
const userController = require('../controllers/user.js');
 
router
    .route('/signup')
    //signup form
    .get(userController.signupForm)
    //signup route
    .post(wrapAsyc(userController.signup));



router
    .route('/login')
    //login form
    .get(userController.renderLoginForm)

    .post(
    saveRedirectUrl,
    passport.authenticate("local" ,{
        failureRedirect : "/login" ,
        failureFlash : true,
    }),
    userController.login
    
    );

router.get('/logout' ,userController.logout);


module.exports = router;

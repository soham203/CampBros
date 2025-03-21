const express = require('express');
const router = express.Router();
const users = require('../controllers/users.js');
passport = require('passport')
const catchAsync = require('../utils/catchAsync');
const { storeReturnTo } = require('../middleware');

router.route('/register')
      .get(users.renderRegister)
      .post(catchAsync(users.register))

router.route('/login')
      .get(users.renderLogin)
      .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), storeReturnTo , users.login)

router.get('/logout', users.logout); 

module.exports = router;
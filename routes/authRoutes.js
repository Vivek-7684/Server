const express = require('express');

const router = express.Router();

const authController = require('../controllers/authController');

// const authController = require('../controllers/authController/signup');   direct import function

router.post("/signup", authController.signup); // dynamic path  redirect to controller

router.post("/login", authController.login);

module.exports = router;

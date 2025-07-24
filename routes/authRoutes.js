const express = require('express');

const router = express.Router();

const authController = require('../controllers/authController');

const checkAndVerifyToken = require('../middlewares/checkAndVerifyToken');

router.post("/signup", authController.signup); // dynamic path  redirect to controller

router.post("/login", authController.login);

router.get("/user-profile", checkAndVerifyToken, authController.viewProfile);

router.patch("/edit-profile", checkAndVerifyToken, authController.editProfile);

router.get("/checkLoggedin", checkAndVerifyToken, authController.isLoggedIn);

router.post("/logOut", checkAndVerifyToken, authController.logOut); // change server state with clear token

module.exports = router;

const express = require('express');

const router = express.Router();

const profileController = require('../controllers/profileController');

const checkAndVerifyToken = require('../middlewares/checkAndVerifyToken');

router.get("/user-profile", checkAndVerifyToken, profileController.viewProfile);

router.patch("/edit-profile", checkAndVerifyToken, profileController.editProfile);

router.put("/upload-profile-image", checkAndVerifyToken, profileController.uploadProfileImage);

router.put("/update-password", checkAndVerifyToken, profileController.updatePassword);


module.exports = router;

const express = require('express');

const router = express.Router();

const CheckAndVerifyToken = require('../middlewares/checkAndVerifyToken');

const productController = require('../controllers/productController');   // direct import function

router.get("/getAll", productController.getAllProduct); // dynamic path  redirect to controller

router.get("/getSingle", CheckAndVerifyToken, productController.getSingleProduct);

router.get("/getProductImages", CheckAndVerifyToken, productController.getProductImages); // images for slider 

module.exports = router;

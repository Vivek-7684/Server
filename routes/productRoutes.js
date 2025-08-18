const express = require('express');

const router = express.Router();

const CheckAndVerifyToken = require('../middlewares/checkAndVerifyToken');

const checkAdmin = require('../middlewares/checkAdmin');

const productController = require('../controllers/productController');   // direct import function

router.get("/getAll", productController.getAllProduct); // dynamic path  redirect to controller

router.get("/getSingle", CheckAndVerifyToken, productController.getSingleProduct);

router.get("/getProductImages", CheckAndVerifyToken, productController.getProductImages); // images for slider 

router.post("/addProduct",checkAdmin, productController.addProduct);

router.put("/products/:id",checkAdmin, productController.updateProduct);

router.delete("/products/:id",checkAdmin, productController.deleteProduct);

module.exports = router;

const express = require('express');

const router = express.Router();

const productController = require('../controllers/productController');   // direct import function

router.get("/getAll", productController.getAllProduct); // dynamic path  redirect to controller

module.exports = router;

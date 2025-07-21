const express = require('express');
const router = express.Router();

const wishListController = require('../controllers/wishListController');
const checkAndVerifyToken = require('../middlewares/checkAndVerifyToken');

// Route to get products in wishlist
router.get("/getProductsInWishList", checkAndVerifyToken, wishListController.getProductsInWishList);

router.post("/addProductsInWishList", checkAndVerifyToken, wishListController.addProductsInWishList);

module.exports = router;
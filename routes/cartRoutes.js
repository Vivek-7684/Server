const express = require("express");
const router = express.Router();

const cartController = require("../controllers/cartController");


// Middleware to check and verify token
const CheckAndVerifyToken = require("../middlewares/checkAndVerifyToken");

// Route to get products in cart
router.get("/getProductsInCart", CheckAndVerifyToken, cartController.getProductsInCart);
// Route to add product to cart
router.post("/addProductToCart", CheckAndVerifyToken, cartController.addProductToCart);
// Route to remove product from cart    
router.post("/removeProductFromCart", CheckAndVerifyToken, cartController.removeProductFromCart);


module.exports = router;

const cartModel = require("../model/cartModel");
const productModel = require("../model/productModel");
// get User's Product in Cart
exports.getProductsInCart = (req, res) => {
    const { cartId, userId, productId } = req.query;
    cartModel.getProductsInCart(cartId, userId, productId, (err, result) => {
        try {
            if (err) return res.status(500).send({ message: "Database Error" });
            return res.status(200).send(result);
        } catch (err) {
            return res.status(500).send(err);
        }
    });
}

// add Product to Cart
exports.addProductToCart = (req, res) => {

    const { userId, productId, quantity, cartId } = req.body;

    cartModel.getProductsInCart(userId, cartId, productId, (err, result) => {
        if (err) return res.status(500).send({ message: "Database Error" });

        if (result.length > 0) {
            const updatedProductQuantity = result[0].quantity || 0 + parseInt(quantity);
            cartModel.updateProductToCart(userId, cartId, productId, updatedProductQuantity, (err, result) => {
                if (err) return res.status(500).send({ message: "Database Error" });
                return res.status(200).send({ message: `${quantity} more Item added in Cart` });
            });

        } else {
            cartModel.insertProductToCart(userId, cartId, productId, quantity, (err) => {
                if (err) return res.status(500).send({ message: "Database Error" });
                return res.status(200).send({ message: "Product added to cart successfully" });
            });
        }
    })
}


// remove Product from Cart
exports.removeProductFromCart = (req, res) => {

    const { userId, productId, quantity, cartId } = req.body;

    cartModel.getProductsInCart(userId, cartId, productId, (err, result) => {
        if (err) return res.status(500).send({ message: "Database Error" });

        if (result.length > 0 && result[0].quantity === 1) {

            cartModel.deleteProductFromCart(userId, cartId, productId, (err, result) => {
                if (err) return res.status(500).send({ message: "Database Error" });
                return res.status(200).send({ message: "Product deleted from cart" });
            });

        } else {
            const updatedProductQuantity = result[0].quantity - 1;
            cartModel.insertProductToCart(userId, cartId, productId, updatedProductQuantity, (err) => {
                if (err) return res.status(500).send({ message: "Database Error" });
                return res.status(200).send({ message: "1 Product Quantity removed from cart successfully" });
            });
        }
    })
}
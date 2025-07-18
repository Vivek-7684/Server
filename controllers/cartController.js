const userModel = require("../model/userModel");
const cartModel = require("../model/cartModel");
const productModel = require("../model/productModel");
// get User's Product in Cart
exports.getProductsInCart = (req, res) => {
    try {
        const { userId } = req.query;
        cartModel.getProductsInCart(userId, productId, (err, result) => {
            try {
                if (err) return res.status(500).send({ message: "Database Error" });
                return res.status(200).send(result);
            } catch (err) {
                return res.status(500).send(err);
            }
        });
    }
    catch (err) {
        return res.status(500).send(err);
    }

}

// add Product to Cart
exports.addProductToCart = (req, res) => {
    console.log(req.Email);

    try {
        const { productId, quantity } = req.body;
        console.log("quantity", quantity);
        userModel.getUsernameByEmail(req.Email, (err, result) => {
            if (err) return res.status(500).send(err.message);
            if (result.length === 0) return res.status(404).send({ message: "User not found" });

            const userId = result[0].id;
            console.log("User ID:", userId);

            cartModel.getProductsInCart(userId, (err, result) => {
                console.log("Cart Result:", result);
                if (result.some(item => item.productId === productId)) { // check if product already exists in cart
                    const existingProduct = result.find(item => item.productId === productId);
                    console.log("Existing Product:", existingProduct);
                    const updatedProductQuantity = parseInt((existingProduct.quantity || 0) + parseInt(quantity));
                    console.log("Updated Product Quantity:", updatedProductQuantity);

                    cartModel.updateProductToCart(userId, productId, updatedProductQuantity, (err, result) => {
                        if (err) return res.status(500).send({ message: "Database Error" });

                        return res.status(200).send({ message: `${quantity} more Item added in Cart` });
                    });

                } else {
                    cartModel.insertProductToCart(userId, productId, quantity, (err) => {
                        if (err) return res.status(500).send({ message: "Database Error" });
                        return res.status(200).send({ message: "Product added to cart successfully" });
                    });
                }
            })

        });
    }
    catch (err) {
        return res.status(500).send(err.message)
    };


}


// remove Product from Cart
exports.removeProductFromCart = (req, res) => {

    const { userId, productId, quantity, cartId } = req.body;

    cartModel.getProductsInCart(userId, cartId, productId, (err, result) => {
        if (err) return res.status(500).send({ message: "Database Error" });

        if (result.length > 0 && result[0].quantity === 1) {

            cartModel.deleteProductFromCart(userId, cartId, productId, (err, result) => {
                if (err) return res.status(500).send({ message: "Database Error" });
                return res.status(200).send({ message: "Product deleted from cart Successfully" });
            });

        } else {
            const updatedProductQuantity = result[0].quantity - 1;
            cartModel.insertProductToCart(userId, cartId, productId, updatedProductQuantity, (err) => {
                if (err) return res.status(500).send({ message: "Database Error" });
                return res.status(200).send({ message: "1 Product Quantity removed from cart" });
            });
        }
    })
}
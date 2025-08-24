const userModel = require("../model/userModel");
const cartModel = require("../model/cartModel");

// get User's Product in Cart
exports.getProductsInCart = (req, res) => {
    try {
        userModel.getUsernameByEmail(req.Email, (err, result) => {

            if (err) return res.status(500).send(err.message);
            if (result.length === 0) return res.status(404).send({ message: "User not found" });

            const userId = result[0].id;
            // get User's Product in Cart
            cartModel.getProductsInCart(userId, (err, result) => {
                try {
                    if (err) return res.status(500).send({ message: "Database Error" });
                    return res.status(200).send(result);
                } catch (err) {
                    return res.status(500).json({ Error: "Something Went Wrong" });
                }
            });
        })

    }
    catch (err) {
        return res.status(500).json({ Error: "Something Went Wrong" });
    }

}

// add Product to Cart
exports.addProductToCart = (req, res) => {


    try {
        const { productId, quantity } = req.body;

        userModel.getUsernameByEmail(req.Email, (err, result) => {
            if (err) return res.status(500).send(err.message);
            if (result.length === 0) return res.status(404).send({ message: "User not found" });

            const userId = result[0].id;

            cartModel.getProductsInCart(userId, (err, result) => {

                if (result.some(item => item.id === productId)) { // check if product already exists in cart

                    const existingProduct = result.filter(item => item.id === productId); // get the existing product

                    const updatedProductQuantity = parseInt((existingProduct[0].quantity || 0) + parseInt(quantity));

                    cartModel.updateProductToCart(userId, productId, updatedProductQuantity, (err, result) => {

                        if (err) return res.status(500).send(err.message);

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

    try {
        const { productId, quantity } = req.body;

        userModel.getUsernameByEmail(req.Email, (err, result) => {
            if (err) return res.status(500).send(err.message);
            if (result.length === 0) return res.status(404).send({ message: "User not found" });

            const userId = result[0].id;

            cartModel.getProductsInCart(userId, (err, result) => {
                if (err) return res.status(500).send({ message: "Database Error" });

                if (result.some(item => item.id === productId && item.quantity > 1)) { // check if product exists and quantity is greater than 1

                    const existingProduct = result.filter(item => item.id === productId); // get the existing product

                    const updatedProductQuantity = parseInt((existingProduct[0].quantity || 0) - parseInt(quantity));

                    cartModel.updateProductToCart(userId, productId, updatedProductQuantity, (err, result) => {

                        if (err) return res.status(500).send(err.message);

                        return res.status(200).send({ message: `${quantity} item removed from Cart` });
                    });

                } else {

                    cartModel.deleteProductFromCart(userId, productId, (err, result) => {
                        if (err) return res.status(500).send({ message: "Database Error" });
                        return res.status(200).send({ message: "Product deleted from cart Successfully" });
                    });
                }
            })
        })
    }
    catch (err) {
        return res.status(500).json({ Error: "Something Went Wrong" });
    };

}
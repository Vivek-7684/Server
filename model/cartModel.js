const connection = require("../db");

// get User's Product in Cart
exports.getProductsInCart = (userId, callback) => {
    connection.query("Select product.id,product.title,product.min_price,cart.quantity,product.Image from cart Join product on cart.productId = product.id where cart.userId = ?", [userId], callback);
}

// Insert Product to Cart
exports.insertProductToCart = (userId, productId, quantity, callback) => {
    connection.query("Insert into Cart(userId,productId,quantity) Values (?,?,?) ",
        [userId, productId, quantity], callback);
}

// update Product to Cart
exports.updateProductToCart = (userId, productId, quantity, callback) => {
    console.log("Updating Product in Cart:", userId, productId, quantity);
    connection.query("update cart set quantity = ? where userId = ? and productId = ?",
        [quantity, userId, productId], callback);
}

// delete Product to Cart
exports.deleteProductFromCart = (userId, productId, callback) => {
    connection.query("delete from Cart  Where userId = ? AND  productId = ?",
        [quantity, userId, productId], callback);
}

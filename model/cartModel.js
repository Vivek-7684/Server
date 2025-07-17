const connection = require("../db");

// get User's Product in Cart
exports.getProductsInCart = (userId, cartId, productId, callback) => {
    connection.query("SELECT * FROM cart WHERE userId = ? AND productId = ? AND cartId = ?",
        [userId, productId, cartId], callback);
}

// Insert Product to Cart
exports.insertProductToCart = (userId, cartId, productId, quantity, callback) => {
    connection.query("Insert into table Cart(userId,cartId,productId,quantity) Values (?,?,?,?) ",
        [userId, cartId, productId, quantity], callback);
}

// update Product to Cart
exports.updateProductToCart = (userId, cartId, productId, quantity, callback) => {
    connection.query("Update table Cart set quantity = ? Where userId = ? AND cartId = ? AND productId = ?",
        [quantity, userId, cartId, productId], callback);
}

// delete Product to Cart
exports.deleteProductFromCart = (userId, cartId, productId, callback) => {
    connection.query("delete from table Cart  Where userId = ? AND cartId = ? AND productId = ?",
        [quantity, userId, cartId, productId], callback);
}

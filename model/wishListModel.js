const connection = require("../db");

// get User's Product in WishList
exports.getProductsInWishList = (userId, callback) => {
    connection.query("select product.id,product.image,product.title,product.content,product.min_price from wishlist Join product ON wishlist.productId = product.Id Where wishlist.userId = ?", [userId], callback);
}

// Insert Product to WishList
exports.insertProductToWishList = (userId, productId, callback) => {
    connection.query("Insert into wishlist(productId,userId) Values (?,?) ",
        [productId, userId], callback);
}

// check Single Product Exist or Not
exports.checkProductInWishList = (userId, productId, callback) => {
    connection.query("Select * from wishlist where userId = ? and productId = ?", [userId, productId], callback);
}

// Delete Product from WishList
exports.deleteProductFromWishList = (userId, productId, callback) => {
    connection.query("delete from wishList where userId = ? and productId = ?",
        [userId, productId], callback);
}


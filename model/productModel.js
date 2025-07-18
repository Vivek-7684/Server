const connection = require('../db');

exports.getSingleProduct = (id, callback) => {
    connection.query("Select * from product where id = ? ", [id], callback);
}

exports.getAllProduct = (callback) => {
    connection.query("Select * from product", callback);
}

exports.getProductImages = (productId, callback) => {
    connection.query("Select productImages.image from product join productImages on productImages.productId = product.id where productImages.productId = ?", [productId], callback);
}
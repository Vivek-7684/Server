const connection = require('../db');

exports.getSingleProduct = (id, callback) => {
    connection.query("Select * from product where id = ? ", [id], callback);
}

exports.getAllProduct = (callback) => {
    connection.query("Select * from product", callback);
}

exports.getProductImages = (productId, callback) => {
    connection.query("Select ProductImages.image from product join ProductImages on ProductImages.productId =  product.id = ?", [productId], callback);
}
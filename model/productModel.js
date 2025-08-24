const connection = require('../db');

exports.getSingleProduct = (id, callback) => {
  connection.query("Select * from product where id = ? ", [id], callback);
}

// get product details
exports.getAllProduct = (callback) => {
  connection.query("Select * from product", callback);
}

// get product preview images
exports.getProductImages = (productId, callback) => {
  connection.query("Select productImages.image from product join productImages on productImages.productId = product.id where productImages.productId = ?", [productId], callback);
}

// add product
exports.addProduct = (imageBuffer, title, content, categories, min_price, max_price, callback) => {
  const query = `INSERT INTO product (image, title, content, categories, min_price, max_price) 
   VALUES (?, ?, ?, ?, ?, ?)`;
  connection.query(query, [imageBuffer, title, content, categories, min_price, max_price], callback);
};

// add preview image
exports.addPreviewImage = (productId, imageBuffer, callback) => {
  const query = `INSERT INTO productimages (productId, image) VALUES (?, ?)`;
  connection.query(query, [productId, imageBuffer], callback);
};

// update
exports.updateProduct = (id, image, title, content, categories, min_price, max_price, callback) => {
  connection.query(
    "UPDATE product SET image = ?, title=?, content=?, categories=?, min_price=?, max_price=? WHERE id=?",
    [image, title, content, categories, min_price, max_price, id],
    callback
  );
};

// insert previewImages
exports.insertPreviewImages = (productId, imageBuffer, callback) => {
  const query = `INSERT INTO productImages(productId,image) VALUES (?,?)`;
  connection.query(query, [productId, imageBuffer], callback);
};

// update previewImages
exports.deletePreviewImages = (productId, callback) => {
  const query = `DELETE FROM productimages  WHERE productId = ?`;
  connection.query(query, [productId], callback);
};

// delete
exports.deleteProduct = (id, callback) => {
  connection.query("DELETE FROM product WHERE id=?", [id], callback);
};
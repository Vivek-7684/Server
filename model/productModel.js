const connection = require('../db');

exports.getSingleProduct = (id, callback) => {
    connection.query("Select * from product where id = ? ", [id], callback);
}

exports.getAllProduct = (callback) => {
    connection.query("Select * from product", callback);
}
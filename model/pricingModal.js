const connection = require('../db');

// add pricing
exports.addPricing = (charges, discount, callback) => {
    connection.query("insert into pricing (shipping_charges,discount_off) values(?,?)", [charges, discount], callback);
}

// edit pricing
exports.editPricing = (charges, discount, callback) => {
    connection.query("update pricing set charges = ? and discount = ?", [charges, discount], callback);
}

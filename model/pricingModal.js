const connection = require('../db');

// get pricing
exports.getPricing = (callback) => {
    connection.query("select * from pricing", callback);
}

// add pricing
exports.addPricing = (charges, discount, callback) => {
    connection.query("insert into pricing (shipping_charges,discount_off) values(?,?)", [charges, discount], callback);
}

// edit pricing
exports.editPricing = (charges, discount, callback) => {
    connection.query("update pricing set shipping_charges = ? , discount_off = ?", [charges, discount], callback);
}

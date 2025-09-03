const connection = require("../db");


// get Coupon 
exports.getCoupon = (callback) => {
    connection.query("Select * from coupon", callback);
}

//check Coupon 
exports.checkCoupon = (id, callback) => {
    connection.query("Select * from coupon where id = ? ", [id], callback);
}

// insert Coupon 
exports.addCoupon = (couponName, minPrice, offer, callback) => {
    connection.query("Insert into coupon(couponName,minPrice,offer) Values (?,?,?)",
        [couponName, minPrice, offer], callback);
}

// delete Coupon
exports.deleteCoupon = (id, callback) => {
    connection.query("delete from coupon where id = ?", [id], callback);
}

// update Coupon
exports.updateCoupon = (couponName, minPrice, offer, id, callback) => {
    connection.query("update coupon set couponName = ?,minPrice =?, offer =? where id =?",
        [couponName, minPrice, offer, id], callback);
}
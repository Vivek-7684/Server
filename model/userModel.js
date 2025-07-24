const connection = require('../db');

// check username by email or name 
exports.findUserByUsernameOREmail = (username, email, callback) => {
    connection.query("Select * from ecom_user where username = ? or email = ?", [username, email], callback);
};

// insert user in database
exports.insertUser = (username, email, password, callback) => {
    connection.query("insert into ecom_user(username,email,password) values(?,?,?) ", [username, email, password], callback);
}

// check user by email
exports.getUsernameByEmail = (email, callback) => {
    connection.query("Select * from ecom_user where email = ?", [email], callback);
}

// Update user details dynamically
exports.updateUser = (fields, values, email, callback) => {
    const sql = `UPDATE ecom_user SET ${fields.join(", ")} WHERE email = ?`;
    connection.query(sql, [...values, email], callback);
};
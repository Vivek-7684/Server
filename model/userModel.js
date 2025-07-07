const connection = require('../db');

// check username by email or name 
exports.findUserByUsernameOREmail = (username, email, callback) => {
    if (username) connection.query("Select * from ecom_user where username = ? or email = ?", [username, email], callback);
    else { connection.query("Select * from ecom_user where email = ?", [email], callback) };
};

// insert user in database
exports.insertUser = (username, email, password, callback) => {
    if (username) connection.query("insert into ecom_user(username,email,password) values(?,?,?) ", [username, email, password], callback);
    else connection.query("insert into ecom_user(email,password) values(?,?) ", [email, password], callback);
}

// check user by email
exports.getUsernameByEmail = (email, callback) => {
    connection.query("Select * from ecom_user where email = ?", [email], callback);
}






const mysql = require('mysql2');


// set configuration for mysql 
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Redhat@123',
    database: 'Sample'
})

connection.connect((err) => {
    if (err) {
        return err;
    }
    console.log("Connected");
})

module.exports = connection;

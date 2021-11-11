const mysql = require('mysql');

const db = mysql.createPool({
    host: "localhost",
    port:"3306",
    user: "root",
    password: "1234",
    database: "nayuntech"
});

module.exports = db;
const mysql = require('mysql');

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'colegio',
    password: '',
    multipleStatements: true
});

conexion.connect(function (err) {
    if (err) {
        console.error(err);
        return;
    } else {
        console.log('db is connected');
    }
});

module.exports = conexion;
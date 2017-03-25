var mysql = require('mysql');

var databaseName = 'fisiofit_test';

// Configuração para teste
if (process.env.NODE_ENV == 'prod') {
    databaseName = 'fisiofit';
}

var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root123',
    database: databaseName,
    connectionLimit: 15
});


function createConnection() {

    return pool;
};

module.exports = function() { return createConnection };

var mysql = require('mysql');

var databaseName = 'casadocodigo';

// Configuração para teste
if (process.env.NODE_ENV == 'test') {
    databaseName = 'casadocodigo_teste';
}

var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: databaseName,
    connectionLimit: 15
});
    

function createConnection() {

    return pool;
};

module.exports = function() { return createConnection };

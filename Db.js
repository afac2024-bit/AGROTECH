const sql = require('mssql');
 
const config = {
    user: 'sa',
    password: 'CodeWithArjun123',
    server: 'localhost',
    database: 'AgroTechDB',
    options: {
        encrypt: false,        
        trustServerCertificate: true
    }
};
 
const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Conectado a la base de datos');
        return pool;
    })
    .catch(err => console.error('Error de conexión: ', err));
 
module.exports = { sql, poolPromise };
 

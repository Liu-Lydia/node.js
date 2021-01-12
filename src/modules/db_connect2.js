const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'Lydia',
    password: 'admin',
    database: 'project11',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

  module.exports = pool.promise();
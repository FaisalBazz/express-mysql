const mysql = require('mysql2');

const dbPool = mysql.createPool({
  host: '34.128.106.232',
  user: 'root',
  password: '1111',
  database: 'express_mysql',
  });

  module.exports = dbPool.promise();
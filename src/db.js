var mysql = require('mysql')
var pool = mysql.createPool({
  host: 'mysql-letsmeet.alwaysdata.net',
  user: 'letsmeet',
  password: 'jesuis95etgta#',
  database: 'letsmeet_letsmeet_bd'
})
module.exports = pool
module.exports.pool = pool

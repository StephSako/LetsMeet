var mysql = require('mysql')
var database = mysql.createPool({
  host: 'mysql-letsmeet.alwaysdata.net',
  user: 'letsmeet',
  password: 'jesuis95etgta#',
  database: 'letsmeet_letsmeet_bd'
})

module.exports = database
module.exports.database = database

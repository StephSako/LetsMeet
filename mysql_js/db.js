var mysql      = require('mysql');
var connection = mysql.createPool({
    host     : 'mysql-letsmeet.alwaysdata.net',
    user     : 'letsmeet',
    password : 'jesuis95etgta#',
    database : 'letsmeet_letsmeet_bd'
});
module.exports=connection;
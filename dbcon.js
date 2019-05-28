var mysql = require('mysql');

//MySQL Credentials - GREG
//var pool = mysql.createConnection({
//    host:'classmysql.engr.oregonstate.edu',
//    user:'cs340_bauergr',
//    password:'3228',
//    database:'cs340_bauergr'
//});

//MySQL Credentials - Monet
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_holtm',
  password        : '4754',
  database        : 'cs340_holtm'
});


module.exports.pool = pool;

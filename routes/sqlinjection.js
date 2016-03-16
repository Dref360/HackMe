var express = require('express');
var router = express.Router();
var mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: "admin",
  password: "pass",
  database: "hackme"
});

router.get('/',function (req,res){
  con.query('SELECT * FROM employees',function(err,rows){
  if(err) throw err;

  console.log('Data received from Db:\n');
  console.log(rows);
  });
  res.render('index', { title: 'Express' });
})


module.exports = router;

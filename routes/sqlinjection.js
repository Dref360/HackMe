var express = require("express");
var mysql = require("mysql");
var router = express.Router();

var con = mysql.createConnection({
  host: "localhost",
  user: "admin",
  password: "pass",
  database: "hackme"
});

var title1 = "Découverte des tables"
var instruction1 = ""

var title2 = "Recherche d'un usager existant"
var instruction2 = ""

var title3 = "Fausse authentification"
var instruction3 = ""


router.get("/",function (req,res,next) {
  res.render("sqlinjection_intro", { });
})

router.post("/part1",function (req,res,next) {
  con.query("SELECT * FROM users", function(err,rows) {
    if(err) 
      throw err;

    console.log("Data received from Db:\n");
    console.log(rows);
  });
  
  var err = "Erreur : Test1"
  res.render("sqlinjection", { title: title1, instruction: instruction1, part: "part1", nextPart: "part2", nextPartMethod: "post", error: err });
})

router.post("/part2",function (req,res,next) {
  var err = "Erreur : Test2"
  res.render("sqlinjection", { title: title2, instruction: instruction2, part: "part2", nextPart: "part3", nextPartMethod: "post", error: err });
})

router.post("/part3",function (req,res,next) {
  var err = "Erreur : Test3"
  res.render("sqlinjection", { title: title3, instruction: instruction3, part: "part3", nextPart: "../phishing", nextPartMethod: "get", error: err });
})

module.exports = router;

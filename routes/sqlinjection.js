var express = require("express");
var mysql = require("mysql");
var crypto = require("crypto");
var router = express.Router();

var con = mysql.createConnection({
  host: "localhost",
  user: "client",
  password: "client",
  database: "hackme"
});

var crypto_algorith = "aes-256-ctr"
var crypto_password = "a4R53Tf9"

var answer = "dtrump69";

function encrypt(text) {
  var cipher = crypto.createCipher(crypto_algorith, crypto_password);
  return cipher.update(text, "utf8", "hex") + cipher.final("hex");
}

function connect (usager, mdp, infos, res) {
  var encryptedPassword = encrypt(mdp);
  var connectionQuery = "SELECT * FROM users WHERE username='" + usager + "' AND encryptedPassword='" + encryptedPassword + "'";
  
  con.query(connectionQuery, function(err, rows) {
    var message = "";
    
    if (err)
      message = err.message;
    else if (rows.length == 0)
      message = "Usager ou mot de passe invalide";
    else
      message = "Bienvenue " + rows[0].username + "!";
    
    infos.connectionMessage = message;
    infos.answer = "";
    res.render("sqlinjection", infos);
  });
}

var infos = {
  connectionMessage: "",
  answerError: ""
}

router.get("/", function (req, res) {
  res.render("sqlinjection", infos);
})

router.post("/", function (req, res) {
  if (req.body.usager !== undefined) {
    connect(req.body.usager, req.body.mdp, infos, res);
  }
  else if (req.body.reponse == answer) {
    res.render("sqlinjection_outro", { });
  }
  else {
    infos.answerError = "Mauvais nom d'usager";
    res.render("sqlinjection", infos);
  }
})

module.exports = router;

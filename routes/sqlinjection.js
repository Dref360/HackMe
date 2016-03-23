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

var part1Answer = "users";
var part2Answer = "dtrump69";
var part3Answer = "Connexion réussie!"

function encrypt(text) {
  var cipher = crypto.createCipher(crypto_algorith, crypto_password);
  return cipher.update(text, "utf8", "hex") + cipher.final("hex");
}

function connect (usager, mdp, partInfos, res) {
  var encryptedPassword = encrypt(mdp);
  var connectionQuery = "SELECT * FROM users WHERE username='" + usager + "' AND encryptedPassword='" + encryptedPassword + "'";
  
  con.query(connectionQuery, function(err, rows) {
    var message = "";
    
    if (err)
      message = err.message;
    else if (rows.length == 0)
      message = "Usager ou mot de passe invalide";
    else
      message = part3Answer;
    
    partInfos.connectionMessage = message;
    res.render("sqlinjection", partInfos);
  });
}

var part1Infos = {
  title: "Découverte des tables",
  instruction: "",
  part: "part1",
  nextPart: "part2",
  connectionMessage: "",
  answerError: ""
}

var part2Infos = {
  title: "Recherche d'un usager existant",
  instruction: "",
  part: "part2",
  nextPart: "part3",
  connectionMessage: "",
  answerError: ""
}

var part3Infos = {
  title: "Fausse authentification",
  instruction: "",
  part: "part3",
  nextPart: "/sqlinjection",
  connectionMessage: "",
  answerError: ""
}

router.get("/", function (req, res) {
  res.render("sqlinjection_intro", { });
})

router.post("/", function (req, res) {
  if (req.body.reponse == part3Answer)
      res.render("sqlinjection_outro", { });
  else {
      part3Infos.answerError = "Mauvais message de succès";
      res.render("sqlinjection", part3Infos);
  }
})

router.post("/part1", function (req, res) {
  if (req.body.usager !== undefined)
    connect(req.body.usager, req.body.mdp, part1Infos, res);
  else
    res.render("sqlinjection", part1Infos);
})

router.post("/part2", function (req, res) {
  if (req.body.usager !== undefined)
    connect(req.body.usager, req.body.mdp, part2Infos, res);
  else {
    if (req.body.reponse == part1Answer)
      res.render("sqlinjection", part2Infos);
    else {
      part1Infos.answerError = "Mauvais nom de table";
      res.render("sqlinjection", part1Infos);
    }
  }
})

router.post("/part3", function (req, res) {
  if (req.body.usager !== undefined)
    connect(req.body.usager, req.body.mdp, part3Infos, res);
  else {
    if (req.body.reponse == part2Answer)
      res.render("sqlinjection", part3Infos);
    else {
      part2Infos.answerError = "Mauvais nom d'usager";
      res.render("sqlinjection", part2Infos);
    }
  }
})

module.exports = router;

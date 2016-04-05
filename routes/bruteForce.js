var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('bruteForce', { title: 'Brute Force', error:false, success:false });
});

router.post('/', function(req,res,next){
  if (req.body.passe == "about")
  {
    res.render('bruteForce', { title: 'Brute Force', error:false, success:true });
  }
  else {
    res.render('bruteForce', { title: 'Brute Force', error:true, success:false });
  }
});

module.exports = router;
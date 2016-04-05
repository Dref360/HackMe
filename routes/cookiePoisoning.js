var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //Set cookie
  var cookie = req.cookies.status;
  if (cookie === undefined)
  {
	res.cookie('sessionId', 'NiupUuf6d3O6l2OsByqT');
	res.cookie('JZin', 'FvAf39vvf3exGPMXoeM0');
	res.cookie('status', 'User');  
  }
  res.render('cookiePoisoning', { title: 'Cookie Poisoning', error:false, status:req.cookies.status });
});

module.exports = router;

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pathTraversal', { title: 'HackMe', error:false });
});

router.get('/displayFile', function(req, res, next) {
	var file = req.query.file;
	res.sendfile('/' + file, {root: __dirname });
})

router.post('/answer', function(req,res,next){
  if (/72(,|.)9%?/i.test(req.body.answer))
  {
    //goodAnswer
    res.send('Félicitations!');
    res.redirect('/');
  }
  else {
    //Bad answer
    console.log('BAD');
	res.end();
    //res.send('Oups! Mauvaise réponse.');
  }
});

module.exports = router;

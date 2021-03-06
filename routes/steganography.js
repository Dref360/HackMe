var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('steganography', { title: 'HackMe', error:false });
});

//AEO le code
router.post('/',function(req,res,next){
  res.download(__dirname + '/../public/out.wav');
});

router.post('/steg2',function(req,res,next){
  res.download(__dirname + '/../public/images/stegano2.jpg');
});

//JHI
router.post('/answer2', function(req,res,next){
  if (req.body.answer == "JHI")
  {
    //goodAnswer
    console.log('Passed!');
    res.redirect('/');
    //res.render('index', { title: 'HackMe' });
  }
  else {
    //Bad answer
    console.log('BAD');
    res.render('steganography2', { title: 'HackMe', error:true });
  }
});

router.post('/answer', function(req,res,next){
  if (req.body.answer == "AEO")
  {
    //goodAnswer
    console.log('Passed!');
    res.render('steganography2', { title: 'HackMe', error:false });
  }
  else {
    //Bad answer
    console.log('BAD');
    res.render('steganography', { title: 'HackMe', error:true });
  }
});

module.exports = router;

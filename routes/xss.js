var express = require('express');
var jsdom = require("jsdom");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("test");
  res.render('xss', { title: 'HackMe', error:false });
});

router.post('/', function(req, res, next){
    var html = "<html><body><div id='answer'><ul><li>" + req.body.answer + "</li></ul></div></body></html>";
    console.log(html);
    jsdom.env(html,
        function(error, window) {
            window = window | {}
            window.document = window.document | {}
            console.log(window.document("script"));
            if (!error) {
                console.log("yay");
                //res.send('Félicitations!');
                res.redirect('/');
            }
            console.log("boo :(");
        });
    //res.send(req.body.answer);
});

router.post('/answer', function(req,res,next){
    res.send('Félicitations!');
    res.redirect('/');
});

module.exports = router;

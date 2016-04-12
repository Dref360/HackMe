var express = require('express');
var jsdom = require("jsdom");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("test");
  res.render('xss', { title: 'HackMe', answer:"", error:false });
});
//xssChallenge : {prefix : String, answer : String, suffix : String} -> Res -> String -> Void
function xssChallenge(htmlChallenge, res, page) {
    htmlChallenge = htmlChallenge | {}
    var html = htmlChallenge.prefix + htmlChallenge.answer + htmlChallenge.suffix;
    console.log("received html: " + html);
    jsdom.env(html,
    function(error, window) {
        if (!error && window && window.document && window.document.getElementsByTagName("script").length > 0) {
            res.send('Félicitations!');
            res.redirect('/');
        }
        else{
            res.render(page, { title: 'HackMe', answer: htmlChallenge.answer ,error:false });
        }
    });
}

router.post('/', function(req, res, next){
    xssChallenge({prefix: "<html><body><div id='answer'><ul><li>", answer: req.body.answer, suffix: "</li></ul></div></body></html>"}, res, "xss");
});



module.exports = router;

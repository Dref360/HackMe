var express = require('express');
var jsdom = require("jsdom");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('xss', { title: 'HackMe', answer:"", won: false });
});


function xssChallenge(htmlChallenge, res, page) {
    var html = htmlChallenge.prefix + htmlChallenge.answer + htmlChallenge.suffix;
    console.log("received html: " + html);
    jsdom.env(html,
    function(error, window) {
        var won;
        if (!error && window && window.document && window.document.getElementsByTagName("script").length > 0) {
            won = true;
        }
        else{
            won = false;
        }
        res.set("X-XSS-Protection", "0").render(page, { title: 'HackMe', answer: htmlChallenge.answer, won:won });
    });
}

router.post('/', function(req, res, next){
    xssChallenge({prefix: "<html><body><div id='answer'><ul><li>", answer: req.body.answer, suffix: "</li></ul></div></body></html>"}, res, "xss");
});



module.exports = router;

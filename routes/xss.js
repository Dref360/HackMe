var express = require('express');
var jsdom = require("jsdom");

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('xss', { title: 'HackMe', answer:"", won: false });
});

router.post('/', function(req, res, next){
    xssChallenge({prefix: "<html><body><div id='answer'><ul><li>", answer: req.body.answer, suffix: "</li></ul></div></body></html>"}, res, "xss");
});

router.get('/2', function(req, res, next) {
  res.render('xss2', { title: 'HackMe', answer:"", won: false });
});

router.post('/2', function(req, res, next){
    function htmlEscape(s) {
        return s.replace(/./g, function(x) {
           return { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&#39;' }[x] || x;       
        });
    }

    var ans = "Bonjour <a href='#'>" + htmlEscape(req.body.answer) +"</a>";
    xssChallenge({prefix: "<html><body><div id='answer'>", answer: ans, suffix: "</div></body></html>"}, res, "xss2");
});

function xssChallenge(htmlChallenge, res, page) {
    var html = htmlChallenge.prefix + htmlChallenge.answer + htmlChallenge.suffix;
    console.log("received html: " + html);
    var won = false;
    var window;
    const virtualConsole = jsdom.createVirtualConsole();
    virtualConsole.on("log", function (message) {
        won = true;
    });
    window = jsdom.jsdom(html, { virtualConsole }).defaultView;
    setTimeout(function(){ 
        window.close();
        res.set("X-XSS-Protection", "0").render(page, { title: 'HackMe', answer: htmlChallenge.answer, won:won }); 
    }, 500);
}




module.exports = router;

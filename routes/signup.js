var express = require('express');
var router = express.Router();

/* GET listing. */
router.get('/', function(req, res, next) {
  res.render('signup');
});

router.post('/confirm', function(req, res, next) {
  console.log("post test");
  res.redirect("/");
});

router.get('/signup/confirm', function(req, res, next) {
  res.redirect('/signup/confirm');
});

module.exports = router;

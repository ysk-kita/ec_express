var express = require('express');
var router = express.Router();

/* GET listing. */
router.get('/', function(req, res, next) {
  res.render('signin');
});

router.post('/exec', function(req, res, next) {
  console.log("Sign In ");

  res.redirect('/');
});

module.exports = router;

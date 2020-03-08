var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var data = {
    errMsg: '',
    form: {name:'', mail:'', password:''},
    isSignIn: req.session.isSignIn,
    isDisplay: false,
  }
  res.render('maintenance', data);
});

module.exports = router;

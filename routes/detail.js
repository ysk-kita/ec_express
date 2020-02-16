var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var itemId = req.query['id'];
  console.log(itemId);

  var data = {
    title: 'test' ,

    isSignIn: req.session.isSignIn,
    isDisplay: true,
  };
  res.render('itemDetails', data);
});

module.exports = router;

var express = require('express');
var router = express.Router();

var items = require('../modules/items.js');
var checker = require('../modules/checker.js');
// DB接続knexインスタンス
var mysql = require('../modules/accessor').mysql;

/* GET users listing. */
router.get('/', async function(req, res, next) {

  var itemId = req.query['id'];
  var detail = await items.getItems(mysql, itemId);

  console.log(detail)

  var data = {
    title: detail[0].name,
    item: detail[0],
    isSignIn: req.session.isSignIn,
    isDisplay: true,
  };
  res.render('itemDetails', data);
});

module.exports = router;

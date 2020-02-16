var express = require('express');
var router = express.Router();

// 自作モジュール呼び出し
var items = require('../modules/items.js');
var checker = require('../modules/checker.js');
// DB接続knexインスタンス
var mysql = require('../modules/accessor').mysql;

/* GET home page. */
router.get('/', async function(req, res, next) {
  var isSale = true;
  newItem = await items.getNewItems(mysql);
  var data = {
    title: 'Kitazon' ,
    sale_status: isSale ? "active": "disabled",
    items: checker.isEmpty(newItem)? []: newItem,
    existItem: !checker.isEmpty(newItem),
    isSignIn: req.session.isSignIn,
    isDisplay: true,
  };

  res.render('index', data);
});



module.exports = router;

var express = require('express');
var router = express.Router();

var items = require('../modules/items.js');
var checker = require('../modules/checker.js');
// DB接続knexインスタンス
var mysql = require('../modules/accessor').mysql;

/* GET users listing. */
router.get('/',async function(req, res, next) {
  if (checker.isEmpty(req.query['cate'])){
    // 何も指定されなければ全商品を出力する
    var categoryItems = await items.getAllItems(mysql);
    var data = {
      title: '商品一覧',
      existItem: !checker.isEmpty(categoryItems),
      items: categoryItems,
      isSignIn: req.session.isSignIn,
      isDisplay: true,
    };
    res.render('category', data);
  } else {
    var categoryItems = []

    var data = {
      title: '商品一覧',
      existItem: !checker.isEmpty(categoryItems),
      items: categoryItems,
      isSignIn: req.session.isSignIn,
      isDisplay: true,
    };
    res.render('category', data);
  }

});

module.exports = router;

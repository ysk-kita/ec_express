var express = require('express');
var router = express.Router();

// 自作モジュール呼び出し
var items = require('../modules/items.js');
var checker = require('../modules/checker.js');
var categoryList = require('../modules/category').categoryList;
// DB接続knexインスタンス
var mysql = require('../modules/accessor').mysql;

/* GET home page. */
router.get('/', async function(req, res, next) {
  var isSale = true;
  var newItem = await items.getNewItems(mysql);
  var data = {
    categoryList: categoryList,
    newItems: checker.isEmpty(newItem)? []: newItem,
    existNewItem: !checker.isEmpty(newItem),
    isSignIn: req.session.isSignIn,
    isDisplay: true,
  };

  res.render('index', data);
});



module.exports = router;

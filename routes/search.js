var express = require('express');
var router = express.Router();

// 自作モジュール呼び出し
var items = require('../modules/items.js');
var checker = require('../modules/checker.js');
// DB接続knexインスタンス
var mysql = require('../modules/accessor').mysql;

/* GET home page. */
router.post('/', async function(req, res, next) {

  if (checker.isEmpty(req.body.search)){
    // 何も指定されなければindexページに戻す
    res.redirect('/');
  } else {
    // 検索アイテムが指定されているので、searchページに遷移する
    var searchItems = await items.getSearchItems(mysql, req.body.search);
    var newItem = await items.getNewItems(mysql);

    var data = {
      existItem: !checker.isEmpty(searchItems),
      items: searchItems,
      existNewItem: !checker.isEmpty(newItem),
      newItems: checker.isEmpty(newItem)? []: newItem,
      isSignIn: req.session.isSignIn,
      isDisplay: true,
    };
    res.render('search', data);
  }
});
module.exports = router;

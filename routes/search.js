var express = require('express');
var router = express.Router();

// 自作モジュール呼び出し
var items = require('../modules/items.js')
// DB接続knexインスタンス
var mysql = require('../modules/accessor').client_mysql;

/* GET home page. */
router.post('/', function(req, res, next) {
  var price = 2000;
  price = price.toLocaleString();
  var isSale = true;
  
  // Knexで色々書いてDB取得する
  //items.getNewItems(mysql);
  
  var data = {
    title: 'Kitazon' ,
    sale_status: isSale ? "active": "disabled",
    items: [
      {
        'name': 'カップラーメン',
        'img_alt': 'img',
        'img': 'images/item03.png',
        'price': price
      },
      {
        'name': '豚骨ラーメン',
        'img_alt': 'img',
        'img': 'images/item04.png',
        'price': price
      },
    ]
  };
  res.render('index', data);
});

module.exports = router;

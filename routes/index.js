var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var price = 2000;
  price = price.toLocaleString();
  var isSale = true;
  
  var data = {
    title: 'Kitazon' ,
    sale_status: isSale ? "active": "disabled",
    items: [
      {
        'name': 'うなぎのかば焼き',
        'img_alt': 'img',
        'img': 'images/item01.png',
        'price': price
      },
      {
        'name': 'バーベキューセット',
        'img_alt': 'img',
        'img': 'images/item02.png',
        'price': price
      },
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
      {
        'name': '色々セット',
        'img_alt': 'test05',
        'img': 'images/item05.png',
        'price': price
      }
    ]
  };
  res.render('index', data);
});

module.exports = router;

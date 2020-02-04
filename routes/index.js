var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var price = 2000;
  price = price.toLocaleString('ja-JP', {"style":"currency", "currency":"JPY"})
    
  var data = { 
    title: 'Express' ,
    items: [
      {
        'name': 'hoge',
        'img_alt': 'test01',
        'img': '',
        'price': "1000".toLocaleString('ja-JP', {"style":"currency", "currency":"JPY"})
      },
      {
        'name': 'fuga',
        'img_alt': 'test02',
        'img': '',
        'price': price
      },
      {
        'name': 'fuga',
        'img_alt': 'test03',
        'img': '',
        'price': price
      },
      {
        'name': 'fuga',
        'img_alt': 'test04',
        'img': '',
        'price': price
      },
      {
        'name': 'fuga',
        'img_alt': 'test05',
        'img': '',
        'price': price
      }
    ]  
  };
  res.render('index', data);
});

module.exports = router;

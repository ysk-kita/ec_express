var express = require('express');
var router = express.Router();

var cart = require('../modules/cart.js');
var checker = require('../modules/checker.js');
// DB接続knexインスタンス
var mysql = require('../modules/accessor').mysql;

/* かごに商品を格納する */
router.post('/in', async function(req, res, next) {
  if (req.session.isSignIn){ 
    // ログインしている場合はDBに情報を格納
    
    var result = cart.insertCart(mysql, req.body.itemId, req.body.quantity);
    if (result == "ERR"){
      res.status(500).send('Oops! Unknown Error Causing');
    } else {
      // かごぺーじに遷移
      res.redirect('/cart');    
    }
  } else { 
    // ログインしていないのでセッションに格納
    
    // セッションが空なら初期化する
    if (checker.isEmpty(req.session.cartInItems)){
      req.session.cartInItems = [];
    }
    
    var cartInItem = {
      itemId: req.body.itemId,
      quantity: parseInt(req.body.quantity),
    };
    // 同じ商品がかごに入ったら配列から要素を取り出して加算する処理を作る
    req.session.cartInItems.push(cartInItem);
  }
  
  res.redirect('/cart');
});

/* かごページを開く */
router.get('/', async function(req, res, next) {
  
  console.log("かごには今以下の商品が入っています");
  console.log(req.session.cartInItems);
  console.log("----");
  res.redirect('/');
});

module.exports = router;

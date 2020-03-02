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

    // セッション上にアイテムを管理しているか確認、未ログイン状態で商品をかごに複数入れていればまとめてDBに投入
    var insertItems = checker.isEmpty(req.session.cartInItems)? [] : req.session.cartInItems;

    // ログインユーザの情報をアイテムに付与
    insertItems.forEach((item)=>{
      item.user = req.session.user;
    });
    var cartInItem = {
      user: req.session.user,
      itemId: req.body.itemId,
      quantity: parseInt(req.body.quantity),
    };
    insertItems.push(cartInItem);

    var result = await cart.insertCart(mysql, insertItems);
    if (result == "ERR"){
      res.status(500).send('Oops! Unknown Error Causing');
    } else if(result == "DUP"){
      // かごページに遷移して、エラーメッセージを出すようにする
      res.redirect('/cart?errCode='+ result);
    } else {
      // かごぺーじに遷移 ログイン中はセッション上のかご情報をリセット
      req.session.cartInItems = [];
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

    // itemIdが被っていないアイテムのみ取り出し
    var notSameItemList = req.session.cartInItems.filter(function(item){
      return item.itemId != cartInItem.itemId;
    });
    // itemIdが被っているアイテムはdictを取り出し
    var sameItem = req.session.cartInItems.find(function(item){
      return item.itemId == cartInItem.itemId;
    });

    if(sameItem == undefined){
      // 既存のかごにある商品と被っていないのでそのままかごにいれる
      req.session.cartInItems.push(cartInItem);
    } else {
      // ItemIdが被っているアイテムの数量を加算
      sameItem.quantity += cartInItem.quantity
      notSameItemList.push(sameItem);
      req.session.cartInItems = notSameItemList;
    }

    res.redirect('/cart');
  }
});

/* かごページを開く */
router.get('/', async function(req, res, next) {
  
  if(!checker.isEmpty(req.query['errCode'])){
    var errCode = req.query['errCode'];
  }
  // コードに応じたエラーメッセージ取得処理
  var result = await cart.getCartItems(mysql, 'test');
  console.log("--result--");
  console.log(result);
  console.log("----");
  res.redirect('/');
});

/* かごページを開く */


module.exports = router;

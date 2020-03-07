var express = require('express');
var router = express.Router();

var cart = require('../modules/cart.js');
var items = require('../modules/items.js');
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
      // 同じ商品が入っていた場合かごページに遷移して、エラーメッセージを出すようにする
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

  if(req.session.isSignIn){
    if(!checker.isEmpty(req.query['errCode'])){
      var errCode = req.query['errCode'];
    }
    // コードに応じたエラーメッセージ取得処理

    // 商品情報取得処理
    var result = await cart.getCartItems(mysql, req.session.user);
    var data = {
      items: result,
      isSignIn: req.session.isSignIn,
      isDisplay: false,
      existItem: !checker.isEmpty(result),
    };
    res.render('cart', data);
  } else {
    // サインインしていない場合は、セッションに持つ商品IDから商品情報を取得して、リスト成形して出力
    if(checker.isEmpty(req.session.cartInItems)){
      var data = {
        items: [],
        existItem: false,
        isSignIn: req.session.isSignIn,
        isDisplay: false,
      };
      res.render('cart', data);
    } else {
      var idList = [];
      req.session.cartInItems.forEach(function(cartInItem) {
        idList.push(cartInItem.itemId);
      });
      itemList = await items.getManyItems(mysql,idList);
      // 商品リストに数量を紐づける
      var cartItems = storedQuantity(itemList, req.session.cartInItems);

      var data = {
        items: cartItems,
        existItem: !checker.isEmpty(cartItems),
        isSignIn: req.session.isSignIn,
        isDisplay: false,
      };
      res.render('cart', data);
    }
  }
});

/* かごから商品を削除する */
router.get('/delete', async function(req, res, next) {
  var deleteItemId = req.query['id'];
  if(req.session.isSignIn){
    await cart.deleteCartItems(mysql, req.session.user, deleteItemId);
    res.redirect('/cart');
  } else {
    // サインインしていない場合はセッションから該当のアイテムを削除
    var newList = req.session.cartInItems.filter(cartItem => {
      return cartItem.itemId != deleteItemId;
    });
    req.session.cartInItems = newList
    res.redirect('/cart');
  }
});

/* セッション管理している数量と取得した商品情報を紐づける */
function storedQuantity(itemList, cartInItems){
  var displayList = []
  itemList.forEach(function(item){
    cartInItems.forEach(function(cartItem) {
      if(item.id==cartItem.itemId){
        item.quantity = cartItem.quantity;
        displayList.push(item);
      }
    })
  });
  return displayList;
}

module.exports = router;

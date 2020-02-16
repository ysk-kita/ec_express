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
    var isSale = true;
    var searchItems = await items.getSearchItems(mysql, req.body.search);
    var newItem = await items.getNewItems(mysql);

    console.log(searchItems);


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

/* 以下promise回りのメモ そのうち移す

  console.log("before:" + newItems);
  newItems = items.getSearchItems(mysql);
  console.log("after:" + newItems);


  // async で無理やり同期処理にする
  // https://blog.honjala.net/entry/2018/08/08/022027 参考
  // var test = await execPromise("test");
  // console.log("test:" + test);

function execPromise(arg) {
  return new Promise((resolve, reject)=>{
    resolve("return Main");
  }).then((res)=>{
    // thenを利用するとチェーンした関数の戻り値が消される
    console.log("chain exec");
    // そのため、return を書いてやらないと、呼び元に値が返ってくれない
    // return res;
    throw new Error("Call Catch Chain");
  }).catch((err)=>{
    // catch関数はチェーン先の関数が戻り値じゃないので当然returnはない
    console.log(err);
    // 明示的にreturnを指定すると？このreturnが終了後に戻ってくれる
    return "Return Errors";
  });
}
*/
module.exports = router;

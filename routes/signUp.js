var express = require('express');
var router = express.Router();
var { check, validationResult }  = require('express-validator');


// 自作モジュール呼び出し
var users = require('../modules/users.js');
// DB接続knexインスタンス
var mysql = require('../modules/accessor').mysql;

/* GET listing. */
router.get('/', function(req, res, next) {
  var data = {
    errMsg: '',
    form: {name:'', mail:'', password:''},
    isSignIn: req.session.isSignIn,
    isDisplay: false,
  }
  res.render('signUp', data);
});

router.post('/execute', [
    // check(<チェック要素>, <エラーメッセージ>).<チェック関数>()
    check('name', 'name needs').notEmpty(), // 名前の必須チェック
    check('mail', 'mail needs').notEmpty(), // メールアドレスの必須チェック
    check('mail', 'mail type').isEmail(),   // メールアドレスの形式チェック
    check('password', 'password needs').notEmpty(), // パスワードの必須チェック
  ], async function(req, res, next) {
    // エラー情報の取り出し
    var errors = validationResult(req);
    if(!errors.isEmpty()){
      var errMsg = '<ul class="sm-error-message">';
      var res_array = errors.array();
      for (var n in res_array){
        errMsg += '<li>'+ res_array[n].msg +'</li>';
      };
      errMsg += '</ul>';

      var data = {
        errMsg: errMsg,
        form: req.body,
        isSignIn: req.session.isSignIn,
        isDisplay: false,
      }
      res.render('signUp', data);
    } else {
      body = req.body;
      result = await users.insertUsers(mysql, body)

      if (result == "DUP"){
        // メールアドレスが重複しているのでやり直しさせる
        var errMsg = '<ul class="sm-error-message">';
        errMsg += '<li>Specified Mail address already Used</li>';
        errMsg += '</ul>';

        var data = {
          errMsg: errMsg,
          form: req.body,
          isSignIn: req.session.isSignIn,
          isDisplay: false,
        }
        res.render('signUp', data);
      } else if (result == "ERR"){
        res.status(500).send('Oops! Unknown Error Causing')
      } else {
        // サインイン状態の設定
        req.session.userId = result;
        req.session.isSignIn = true;

        // todo アカウント作成完了ページに遷移
        res.redirect("/");
      }
    }
});


module.exports = router;

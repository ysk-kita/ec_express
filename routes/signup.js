var express = require('express');
var router = express.Router();
var { check, validationResult }  = require('express-validator');


// 自作モジュール呼び出し
var users = require('../modules/users.js');
var checker = require('../modules/checker.js');
// DB接続knexインスタンス
var mysql = require('../modules/accessor').mysql;

/* GET listing. */
router.get('/', function(req, res, next) {
  var data = {
    errMsg: '',
    form: {name:'', mail:'', password:''}
  }
  res.render('signup', data);
});

router.post('/execute', [
    // check(<チェック要素>, <エラーメッセージ>).<チェック関数>()
    check('name', 'name needs').notEmpty(), // 名前の必須チェック
    check('mail', 'mail needs').notEmpty(), // メールアドレスの必須チェック
    check('mail', 'mail type').isEmail(),   // メールアドレスの形式チェック
    check('password', 'password needs').notEmpty(), // パスワードの必須チェック
  ], (req, res, next) => {
    // エラー情報の取り出し
    var errors = validationResult(req);
    if(!errors.isEmpty()){
      var errMsg = '<ul class="errorMessage">';
      var res_array = errors.array();
      for (var n in res_array){
        errMsg += '<li>'+ res_array[n].msg +'</li>';
      };
      errMsg += '</ul>';

      var data = {
        errMsg: errMsg,
        form: req.body
      }
      res.render('signup', data);
    } else {
      body = req.body;
      users.insertUsers(mysql, body)
      // todo アカウント作成完了ページに遷移
      res.redirect("/");
    }
});


module.exports = router;

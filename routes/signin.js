var express = require('express');
var router = express.Router();
var { check, validationResult }  = require('express-validator');

var users = require('../modules/users.js');
var checker = require('../modules/checker.js');
var mysql = require('../modules/accessor').mysql;

/* GET listing. */
router.get('/', function(req, res, next) {
  var data = {
    errMsg: '',
    isSignIn: req.session.isSignIn,
    isDisplay: false,
  }
  res.render('signIn', data);
});

router.post('/execute', [
    check('mail', 'mail needs').notEmpty(), // メールアドレスの必須チェック
    check('password', 'password needs').notEmpty(), // パスワードの必須チェック
  ], async function(req, res, next) {

    // validations
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
    }
    res.render('signIn', data);
  } else {
    // get
    body = req.body;
    user = await users.getUsers(mysql, body.mail, body.password);

    if(checker.isEmpty(user)){
      var errMsg = '<ul class="sm-error-message">';
      errMsg += '<li>Mistake mail or password</li>';
      errMsg += '</ul>';

      var data = {
        errMsg: errMsg,
        isSignIn: req.session.isSignIn,
        isDisplay: false,
      }
      res.render('signIn', data);
    } else {
      // todo セッションにログイン情報を格納する
      req.session.isSignIn = true;
      res.redirect("/");
    }
  }
});

module.exports = router;

var express = require('express');
var router = express.Router();
var { check, validationResult }  = require('express-validator');


// 自作モジュール呼び出し
var users = require('../modules/users.js');
// DB接続knexインスタンス
var mysql = require('../modules/accessor').mysql;

/* GET listing. */
router.get('/', function(req, res, next) {
  req.session.isSignIn = false;
  req.session.userId = undefined;
  res.redirect("/");
});


module.exports = router;

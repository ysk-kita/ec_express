const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
// router load
const indexRouter = require('./routes/index');
const searchRouter= require('./routes/search');
const signInRouter= require('./routes/signIn');
const signUpRouter= require('./routes/signUp');
const signOutRouter= require('./routes/signOut');
const detailRouter= require('./routes/detail');
const cartRouter= require('./routes/cart');
const settleRouter= require('./routes/settle');
const categoryRouter= require('./routes/category');

const app = express();
var sessionParameter = {
  secret: 'kitazon Session',
  resave: false, // セッションストアには保存しない
  saveUninitialized: false, // 初期化していない値の強制保存はしない
  cookie: { maxAge: 60 * 60 * 1000 }, // 1hクッキーを保存
}
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session(sessionParameter));

// Router
app.use('/', indexRouter);
app.use('/search', searchRouter);
app.use('/signIn', signInRouter);
app.use('/signUp', signUpRouter);
app.use('/signOut', signOutRouter);
app.use('/detail', detailRouter);
app.use('/cart', cartRouter);
app.use('/settle', settleRouter);
app.use('/category', categoryRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

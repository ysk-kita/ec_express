var mysql = require('knex')({
  client: 'mysql',
  connection: {
    host     : '127.0.0.1',
    user     : 'root',
    password : '',
    database : 'node_app'
  },
  pool: {
    min: 0,
    max: 7
  },
  migrations: {

  }
});

var client = {
  mysql: mysql,
}

module.exports = client;
/*
SQL実行メソッドにknexインスタンス渡してもエラーになった理由
⇒  Node.jsのエクスポート仕様を理解できてなかった

 解説記事いまいちわかりずらいので挙動メモ
 module.exports ：
   require(<ファイル名.js>) は「module.exports = <指定したアイテム>」
   □ Stringオブジェクト指定：
     log(require(...))でそのまま指定文字列が出力
   □ Dictionaryオブジェクト指定：
     log(require(...))でそのままDicオブジェクトが出力
     dictアイテム内にfunction入れてると、require()['key']() or require().key()で関数を呼び出せる
   □ Functionオブジェクト指定：
     require(...)() で関数を実行できる。
     ただし無名関数の定義 ()=> {} ではコンストラクタとして利用できない。
     function(){} でないと xxx not Constractorというエラーが発生する

  公式(https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Functions/Arrow_functions)より
  > アロー関数はコンストラクタとして使用できず、new と共に使うとエラーになります

*/
var expString = "hogeString";

var expObj = {
  hoge: 'hogeObject',
  func: ()=>{
    return 'hello func' ;
  },
};

var expFunc = function() {
  console.log("call Constractor");

  this.name = "hoge";
  this.item = "expt";

  this.getItem = ()=>{
    console.log(this.item);
  };

  this.getName = ()=> this.name;
};

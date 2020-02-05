exports.sayHello = function () {
  console.log("Hello!");
}

exports.getNewItems = function(client){
  // 関数をチェーン実行してDBからオブジェクトを取得する
  return client.select("*").from("items")
  .then(function(reslut){
    console.log("----[after select callback]----");
    console.log(reslut);
    console.log("--------");
  })
  .catch(function(err){
    console.log("----[after error handling callback]----");
    console.log(err);
    console.log("-------");
  });
}
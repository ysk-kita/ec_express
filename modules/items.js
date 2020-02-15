var getNewItems = function(client){
  // 関数をチェーン実行してDBからオブジェクトを取得する
  return client.select("*").from("items").where('new_item', 1)
  .catch(function(){
    console.log("Error Caused");
  });
}

var getSearchItems = function(client){
  // 関数をチェーン実行してDBからオブジェクトを取得する
  return client.select("*").from("items")
  .catch(function(){
    console.log("Error Caused");
  });
}


module.exports = {
  getSearchItems,
  getNewItems,
};

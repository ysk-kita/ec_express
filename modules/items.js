var getSearchItems = function(client){
  // 関数をチェーン実行してDBからオブジェクトを取得する
  return client.select("*").from("items")
  .then(function(reslut){
    console.log("----[select callback]----");
    console.log(reslut);
    console.log("--------");
    return "result";
  })
  .catch(function(){
    return "Error Happend";
  });
}

module.exports = {
  getSearchItems,
  
};
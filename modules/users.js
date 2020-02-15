var insertUsers = function(client, body){
  return client('users').insert([
    {name: body.name, mail: body.mail, password: body.password},
  ]).then(function(){
    console.log("insert complete.")
  })
  .catch(function(){
    console.log("Error Caused");
  });
}

var getUsers = function(client, body){
  // 関数をチェーン実行してDBからオブジェクトを取得する
  return client.select("*").from("users").where('mail', body.mail)
  .catch(function(){
    console.log("Error Caused");
  });
}


module.exports = {
  insertUsers,
  getUsers,
};

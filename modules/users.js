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

var getUsers = function(client, mail, password){
  // 関数をチェーン実行してDBからオブジェクトを取得する
  return client.select("*").from("users").where('mail', mail).andWhere('password', password)
  .catch(function(){
    console.log("Error Caused");
  });
}


module.exports = {
  insertUsers,
  getUsers,
};

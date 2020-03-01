var insertCart = function(client, insertItems){
  return client('users').insert(insertItems).then(function(res){
    console.log("以下のアイテムをかごDBにいれました");
    console.log(insertItems);
    console.log("---");
    return "OK";
  })
  .catch(function(err){
    console.log(err);
    return "ERR";
  });
};



module.exports = {
  insertCart,
};

var insertCart = function(client, insertItems){
  return client('cart').insert(insertItems).then(function(res){
    console.log("以下のアイテムをかごDBにいれました");
    console.log(insertItems);
    console.log("---");
    return "OK";
  })
  .catch(function(err){
    if (err.code == "ER_DUP_ENTRY"){
      console.log("同じアイテムが入っています")
      return "DUP"
    } else {
      return "ERR";
    }
  });
};



module.exports = {
  insertCart,
};

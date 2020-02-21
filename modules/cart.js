var insertCart = function(client, user, itemId, quantity){
  return client('users').insert([
    {user: user, itemId: itemId, quantity: quantity},
  ]).then(function(res){
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

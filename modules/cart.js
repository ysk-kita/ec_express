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

/* かごに入っている商品情報を引き出す */
var getCartItems = function(client, user){
  // SELECT items.name, cart.quantity, items.price
  // FROM items JOIN cart ON items.id = cart.itemId
  // WHERE cart.user = user; を実現
  return client('items')
    .join('cart', 'items.id', 'cart.itemId')
    .select('items.id', 'items.img', 'items.name', 'cart.quantity', 'items.price')
    .where('cart.user', user);
}

var deleteCartItems = function(client, user, itemId){
  return client('cart')
    .where('itemId', itemId)
    .andWhere('user', user)
    .del();
}

module.exports = {
  insertCart,
  getCartItems,
  deleteCartItems,
};

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

/* 指定した商品をかごから削除する */
var deleteCartItems = function(client, user, itemId){
  return client('cart')
    .where('itemId', itemId)
    .andWhere('user', user)
    .del();
}

/* 特定ユーザの特定商品群のかご情報を取得する */
var getManyCartItems = function(client, user, idList){
  return client.select("*")
    .from("cart")
    .whereIn('itemId', idList)
    .andWhere('user', user)
    .catch(function(){
      console.log("Error Caused");
    });
}

/* かご内商品数量の更新 */
var updateQuantity = function(client, user, updateItem){
  return client('cart')
    .where('user', user)
    .andWhere('itemId', updateItem.itemId)
    .update({quantity: updateItem.quantity,})
    .catch(()=>{
      console.log("Update Error Caused");
    });
}

module.exports = {
  insertCart,
  getCartItems,
  deleteCartItems,
  getManyCartItems,
  updateQuantity,
};

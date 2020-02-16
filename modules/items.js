var getNewItems = function(client){
  return client.select("*").from("items").where('new_item', 1)
  .catch(function(){
    console.log("Error Caused");
  });
}

var getSearchItems = function(client, word){
  word = '%' + word + '%'
  return client.select("*").from("items").where('name', 'like', word)
  .catch(function(){
    console.log("Error Caused");
  });
}

var getItems = function(client, id){
  return client.select("*").from("items").where('id', id)
  .catch(function(){
    console.log("Error Caused");
  });
}


module.exports = {
  getSearchItems,
  getNewItems,
  getItems,
};

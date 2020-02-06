function isEmpty(val){
  //null or undefined or ''(空文字) or 0 or false
  if (!val) {
    if (val !== 0 && val !== false) {
        return true;
    }
  //array or object
  }else if(typeof val == "object"){
    return Object.keys(val).length === 0;
  }
  return false; //値は空ではない
}

module.exports = {
  isEmpty,
}
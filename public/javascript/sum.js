function reCalcPrice(calcCount){
 
 var sumPrice = 0;
 for (var i=0; i < calcCount; i++){
  // 単価取得
  var unitPrice = parseInt(document.getElementById("price-" + i).textContent);
  // セレクトボックスオブジェクトを取得
  var selectBoxHtmlObject = document.getElementById("quantity-" + i);
  // 現在指定している値を取得する
  var index = selectBoxHtmlObject.selectedIndex;
  var quantity = selectBoxHtmlObject.options[index].value;

  // 総計に加算
  sumPrice += unitPrice * quantity;
 }
 // テキスト置き換え
 document.getElementById("sum").textContent = sumPrice;
}
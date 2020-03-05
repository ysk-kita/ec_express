function calkPrice() {
 var num0 = document.getElementById('quantity').value;
 var num1 = document.getElementById('price').value;

 if ( isNaN(num0) || num0 == '' ){
 var num0 = 0;
 }
 
 alert(num1);
 var sum = parseInt(num0) * parseInt(num1);
 document.getElementById('sum').innerHTML = addFigure(sum);
}
 
// 3桁でカンマを入れる
function addFigure(str){
 var num = new String(str).replace(/,/g, "");
 while(num != (num = num.replace(/^(-?\d+)(\d{3})/, "$1,$2")));
 return num;
}


/*点赞的数量：*/
document.getElementById("good").innerText = "";
var good = document.getElementById("good").textContent;
 
//document.getElementById("bad").innerText  = "";
//var bad = document.getElementById("bad").textContent;
window.onload = function(){
    if (good == "") {
        good = 0;
        document.getElementById("good").innerText = 0;
    }
    //if (bad == "") {
    //    bad = 0;
    //    document.getElementById("bad").innerText = 0;
    //}              
}
 
/*点赞的数量：*/
function sendGood(){
    good = parseInt(good) + 1;
    document.getElementById("good").innerText = good;
     
    document.getElementById("goodSpan").onclick = function(e){
        e.preventDefault();
        e.stopImmediatePropagation();
    }
}
 
 
/*踩的数量：*/
//function sendBad(){
//    bad = parseInt(bad) + 1;
//    document.getElementById("bad").innerText = bad;
//    document.getElementById("badSpan").onclick = function(e){
//        e.preventDefault();
//        e.stopImmediatePropagation();
//    }
//}
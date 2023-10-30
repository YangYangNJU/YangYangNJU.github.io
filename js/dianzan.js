

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

$(function () {
    $('.zan').click(function () {
        var tag=document.createElement('span')
        tag.style.color='blue';
        tag.style.position='absolute';
        tag.innerHTML='+1'

        var top=5;
        var left=5;
        var fontsize=12;
        var opacity=1;

         tag.style.fontSize=fontsize+'px';
         tag.style.top=top+'px';
         tag.style.left=left+'px';
         tag.opacity=opacity;
         $(this).append(tag);

        var obj=setInterval(function () {
            top-=15;
            left+=5;
            fontsize+=12;
            opacity-=0.2;

            tag.style.fontSize=fontsize+'px';
            tag.style.top=top+'px';
            tag.style.left=left+'px';
            tag.opacity=opacity;

            if(opacity<0){
                clearInterval(obj);
                tag.remove();
            }
            },100)
    })
})



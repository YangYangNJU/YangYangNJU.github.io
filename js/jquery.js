<script type="text/javascript">
</script>$(function(){
    if (localStorage.getItem("k_con")!=null) {
    ("k_con",$("#dCon").html(localStorage.getItem("k_con")));
   }
})
function PostCon(){
    var sCon = $("#trCon").val();
    $("#dCon").append("<div>" +sCon+ "</div>");
    localStorage.setItem("k_con",$("#dCon").html());
}
function Clear(){
    $("#dCon").html("");
    localStorage.clear();
}
</script>

var datatable = null;
 
var db = openDatabase("Mydata", "", "My Database", 1024 * 100);
 
//添加数据
function init() {
    datatable = document.getElementById("datatable");
    showAllData();
}
 
//移除数据
function removeAllData() {
    for (var i = datatable.childNodes.length - 1; i >= 0; i--) {
        datatable.removeChild(datatable.childNodes[i]);
    }
 
    var tr = document.createElement("tr");
    var th1 = document.createElement("th");
    var th2 = document.createElement("th");
    var th3 = document.createElement("th");
 
    th1.innerHTML = "姓名";
    th2.innerHTML = "留言";
    th3.innerHTML = "时间";
 
    tr.appendChild(th1);
    tr.appendChild(th2);
    tr.appendChild(th3);
    datatable.appendChild(tr);
 
}
 
function showData(row) {
    var tr = document.createElement("tr");
    var td1 = document.createElement("td");
    td1.innerHTML = row.name;
    var td2 = document.createElement("td");
    td2.innerHTML = row.message;
    var td3 = document.createElement("td");
    var t = new Date();
    t.setTime(row.time);
    td3.innerHTML = t.toLocaleDateString() + "" + t.toLocaleTimeString();
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    datatable.appendChild(tr);
 
}
 
//数据库的查询
function showAllData() {
    db.transaction(function (tx) {
        tx.executeSql("SELECT * FROM MsgData", [], function (tx, rs) {
            alert(rs.rows.length + "条已插入");
            removeAllData();
            for (var i = 0; i < rs.rows.length; i++) {
                showData(rs.rows.item(i));
            }
        })
    })
}
 
// 数据库的插入
function addData(name, message, time) {
    db.transaction(function (tx) {
        tx.executeSql("CREATE TABLE IF NOT EXISTS MsgData(name TEXT,message TEXT,time INTEGER)");//创建数据库
        tx.executeSql("INSERT INTO MsgData VALUES(?,?,?)", [name, message, time], function () {
            alert("插入成功");
        },
            function (tx, error) {
                alert(error.source + "::" + error.message);
            }
            )
 
    })
}
 
function saveData() {
    var name = document.getElementById("name").value;
    var memo = document.getElementById("memo").value;
    var time = new Date().getTime();
    alert(name + "::" + memo + "::" + time);
    addData(name, memo, time);
    showAllData();
}

function getOnePageMessage(id, page){
    var onePageMessageTmp;
var messagePageCount;
isLoading = false;
$.ajax({
    url : serverPrefix + "/wbLeaveMessage/getLeaveMessage",
    type : "get",
    dataType: "json",
    data: {
        wbId: id,
        messageType: 1,
        page: page,
        pageSize: 10
    },
    success : function (data) {
        if (data.code == 0){
            messagePageCount = data.result.pageCount;
            onePageMessageTmp = data.result.leaveMessages;
            if ((onePageMessageTmp.length == 0) || (messagePageCount == 1)) {       // 无数据或只有一页数据，隐藏加载提示
                $("#loading").hide();
            }
            if (onePageMessageTmp.length != 0) {
                addMessage(onePageMessageTmp);
                isLoading = true;
            }
        }
        else{
            onePageMessageTmp.length = 0;
            $("#loading").hide();
        }
    }
});
}

function addMessage(leaveMessages){
    var template = "";
    var html = "";
    for (var i = 0; i < leaveMessages.length; i++){
        template = '<li class="item" id="{id}">';
        template += '    <div class="pic">';
        template += '        <img src="http://images.v2gogo.com/{headImgUrl}">';          // 用户头像
        template += '    </div>';
        template += '    <div class="info">';
        template += '        <div class="name">{fullname}</div>';
        template += '        <div class="time">{createTime}</div>';
        template += '        <div class="content">{content}</div>';
        template += '        <div class="userName" style="display: none">{username}</div>';
        template += '    </div>';
        template += '</li>';
 
        var timestamp = leaveMessages[i].createTime;           // 时间戳设置为北京时间
        leaveMessages[i].createTime = formatDate(timestamp);
 
        var userimg = leaveMessages[i].headImgUrl;                 // 如果headImgUrl等于null,替换为默认路径
        if (userimg == null){
            leaveMessages[i].headImgUrl = "headPortrait/default_head_img.png";
        }
        html = template.formatString(leaveMessages[i]);
        $(".commentList").append(html);
    }
}




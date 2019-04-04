var sc = document.getElementsByClassName('r_sc');
$("#header").load("header.html");
$('#base').load('base.html');

$('.mineLeft a').click(function() {
	$(this).addClass('aStyle').siblings('a').removeClass('aStyle');
})

$('.mineRight .r_sc').click(function(event) {
	if ($(this).attr('class') == 'r_subset r_sc') {
		$(this).addClass('sc_color');
	} else {
		$(this).removeClass('sc_color');
	}
	return false;
})

$('.tcdl').click(function() {// 点击退出登录
	$('#denglu').css('display', 'block')
})
$('.zzc').click(function() {//
	$('#denglu').css('display', 'none')
})
var uid;

function tzxq(sid) {
	// window.location.href="rent_details.html?sid="+sid;
}
function collectall() {
	uid = $.cookie("uid");
	if (uid == undefined) {
		alert("请登录!");
		window.location.href = "register.html";
	} else {
		$.ajax({
					type : "post",
					url : "192.168.3.5/Store/appclt!Collection.action?u.uid=" + uid,
					success : function(data) {
						$("#shouc").empty(); // 清空子元素
						list = JSON.parse(data);
						var html = [];
						if (list.length > 0) {
							for (var i = 0; i < list.length; i++) {
								html += "<li>";
								html += '<a href="javascript:void(0);"  onclick=tzxq("'
										+ list[i].sid
										+ '")><img src="'
										+ list[i].img
										+ '"/><div class="riBox"><h4>'
										+ list[i].sname
										+ '</h4><div class="r_subset"><span>转让费：<b>'
										+ list[i].transferfee
										+ '</b></span><span style="margin-left: 20px;">月租金：<b>'
										+ list[i].price
										+ '/月</b></span></div><div class="r_subset"><span>商铺类型：</span><span>'
										+ list[i].shoptype
										+ '</span></div><div class="r_subset"><span>当前经营：</span><span>-</span></div></div></a><div class="r_subset r_sc" style="color:#0b9ad6;" onclick=deletecollect("'
										+ list[i].sid
										+ '")   ><b class="iconfont icon-shoucang"></b>取消收藏</div>';
								html += "</li>";
							}
							$('#shouc').html(html);
						} else {
							html = "<li><h1>暂无收藏</h1></li>";
							$('#shouc').html(html);
						}
					},
					error : function() {
						window.location.href="502.html";
					}
				});
	}
}

// 取消收藏
function deletecollect(sid) {
	uid = $.cookie("uid");
	$.ajax({
		url : "192.168.3.5/Store/storeactions!my_deleteshoucang.action?store.sid=" + sid
				+ "&store.uid=" + uid,
		async : false
	});
	collectall();

}

// 页面加载时初始化分页
$(function() {
	collectall();
});

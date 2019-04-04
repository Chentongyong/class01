var hy = '';// 行业
var qy = '';// 区域
var mj = '';// 面积
var zj = '';// 租金
var mmx;// 最小面积
var mm;// 最大面积
var zz;// 最多租金
var zzx;// 最少租金
var mjmjs;//面积输入框
var mjmjd;//面积输入框
var zijimjs;//租金输入框
var zijimjd;//租金输入框
var shi;//市
$(document).ready(function() {
	shi= $.cookie("my_city");
	if(shi== undefined){
		shi="北京市";
	}

})	
function dasdsa(){
	
	var date={"store.city":shi};
	$.ajax({
		url: "http://192.168.3.5/Store/cityaction!main.action",
		type: 'post',
		async:false, //不是异步处理
		data: date,
		dataType: 'json',
		success: function(data) {
			var quyu = document.getElementById("quyu");
			for(var i=0;i<data.length;i++){
				var li = document.createElement('li'); //创建元素节点
				li.innerHTML +=	data[i].text;
				quyu.appendChild(li);
			}
		 },
		 complete: function() { //添加分页按钮栏
				getPageBar();
		},
		error: function(xhr, type, errorThrown) {
			window.location.href="502.html";
		}
	});
	$('.quyu li').click(function() {// 区域
		$(this).addClass('col').siblings('li').removeClass('col');
		qy = $(this).text();
		fromtable(1);
	})

}
$("#header").load("header.html");
$('#base').load('base.html');
$('.hangye li').click(function() { // 行业
	$(this).addClass('col').siblings('li').removeClass('col');
	hy = $(this).text();
	fromtable(1);
})



$('.pingfang li').click(function() {// 面积
	$(this).addClass('col').siblings('li').removeClass('col');
	mj = $(this).text();
	$("#mjmjs").val("");
	$("#mjmjd").val("");
	fromtable(1);
	
})

$('.zujing li').click(function() {// 租金
	$(this).addClass('col').siblings('li').removeClass('col');
	zj = $(this).text();
	$("#zijimjs").val();
	$("#zijimjd").val();
	fromtable(1);
	
})

var curPage; // 当前页数
var totalItem; // 总记录数
var pageSize; // 每一页记录数
var totalPage; // 总页数
var list;
var url;
var rows = 40;
var date;// 传值

// 给行业判断
function faskgafsdhjk(aa) {
	if (aa == "") {
		return "无";
	}else if(aa=="不限"){
		return "无";
	}else {
		return aa;
	}
}
//给区域做判断
function dasnj(aa){
	if (aa == "") {
		return "";
	}else if(aa=="不限"){
		return "";
	}else {
		return aa;
	}
}
//给面积做判断
function fadskghfdsakjhg(mj){
	switch (mj) {
	case "":
		mmx = "";
		break;
	case "不限":
		mmx = "";
		mm = "";
		break;
	case "20m²以下":
		mmx = 20;
		mm = "";
		break;
	case "20m²-50m²":
		mmx = 20;
		mm = 50;
		break;
	case "50m²-100m²":
		mmx = 50;
		mm = 100;
		break;
	case "100m²-200m²":
		mmx = 100;
		mm = 200;
		break;
	case "200m²-500m²":
		mmx = 200;
		mm = 500;
		break;
	case "500m²以上":
		mmx = "";
		mm = 500;
		break;
	}
}
//判断租金
function dsabhgkdfa(zj){
	switch (zj) {
	case "":
		zzx = "无";
		break;
	case "不限":
		zzx = "无";
		zz = "";
		break;
	case "2千元以下":
		zzx = 2000;
		zz = "";
		break;
	case "2-5千元":
		zzx = 2000;
		zz = 5000;
		break;
	case "5千-1万元":
		zzx = 5000;
		zz = 10000;
		break;
	case "1-2万元":
		zzx = 10000;
		zz = 20000;
		break;
	case "2-5万元":
		zzx = 20000;
		zz = 50000;
		break;
	case "5万元以上":
		zzx = "无";
		zz = 50000;
		break;
	}
}

function tzxq(sid){
	window.location.href="rent_details.html?sid="+sid;
}
function fromtable(page) {
	hy = faskgafsdhjk(hy);
	qy=dasnj(qy);
	var mjmjs=$("#mjmjs").val();
	var mjmjd=$("#mjmjd").val();
	if(mjmjs!="" ||  mjmjd!=""){
		$('#pf_but').click(function() {
			$('.pingfang li').removeClass('col').eq(0).addClass('col');
		})
		mmx=mjmjs;
		mm=mjmjd;
	}else{
		fadskghfdsakjhg(mj);
	}
	var zijimjs=$("#zijimjs").val();
	var zijimjd=$("#zijimjd").val();
	if(zijimjs!="" ||  zijimjd!=""){
		$('#zj_but').click(function() {
			$('.pingfang li').removeClass('col').eq(0).addClass('col');
		})
		zzx=zijimjs;
		zz=zijimjd;
	}else{
		dsabhgkdfa(zj);
	}
	
	date = {
		"store.typead" : "出租",
		"store.shoptype" : hy,
		"store.address" : shi + qy,
		"store.square" : mmx,
		"store.addreaa" : mm,
		"store.price" : zzx,
		"store.prices" : zz
	};
	url = "http://192.168.3.5/Store/storeactions!pczzr.action?page=" + page + "&rows=" + rows;
	$.ajax({
				type : "post",
				url : url,
				data : date,
				success : function(data) {
					$("#tbdy").empty(); // 清空子元素
					if (data != null) {
						list = JSON.parse(data);
						if (list.length > 0) {
							totalItem = list[0].ext;
						} else {
							totalItem = 0;
						}
						pageSize = rows;
						curPage = page;
						totalPage = Math.ceil(totalItem / rows);
						var html = [];
						if(totalItem!=0){
							for (var i = 0; i < list.length; i++) {
								html += "<li>";
								html += '<a  href="javascript:void(0);" onclick=tzxq("'+list[i].sid+'") ><img src="'
										+ list[i].img
										+ '" alt="" /><div class="le_details"><h5>'
										+ list[i].name
										+ '</h5><div><span>区域：<span>'
										+ list[i].address
										+ '</span></span><span class="post_right1"><b>'
										+ list[i].square
										+ '</b>平米</span>'
										+ '</div><div><span>经营业态：<span>'
										+ list[i].shoptype
										+ '</span></span><span class="post_right1">转让费：<b>'
										+ list[i].transferfee
										+ '</b></span><span class="post_right2">租金：<b>'
										+ list[i].price
										+ '</b>元/月</span>'
										+ '</div><p class="p_stys">来源：<span>'
										+ fromdata(list[i].sdate) + ' 前更新</span></p></div></a>';
								html += "</li>";
							}
							$('#tbdy').html(html);
						}
						
					}
				},
				complete : function() { // 添加分页按钮栏
					getPageBar();
				},
				error : function() {
					window.location.href="502.html";
				}

			});

}

// 获取分页条（分页按钮栏的规则和样式根据自己的需要来设置）
function getPageBar() {
	if (curPage > totalPage) {
		curPage = totalPage;
	}
	if (curPage < 1) {
		curPage = 1;
	}
	pageBar = "";
	// 如果不是第一页
	// if(curPage != 1) {
	// pageBar += "<span class='pageBtn' style='padding:0 5px;'><a
	// href='javascript:fromtable(1);'>首页</a></span>";
	pageBar += "<span class='pageBtn' style='padding:0 15px'><a href='javascript:fromtable("
			+ (curPage - 1)
			+ ")' class='fyBox iconfont icon-jiantou33' ></a></span>";
	// }
	// 显示的页码按钮(5个)
	var start, end;
	if (totalPage <= 5) {
		start = 1;
		end = totalPage;
	} else {
		if (curPage - 2 <= 0) {
			start = 1;
			end = 5;
		} else {
			if (totalPage - curPage < 2) {
				start = totalPage - 4;
				end = totalPage;
			} else {
				start = curPage - 2;
				end = curPage + 2;
			}
		}
	}
	for (var i = start; i <= end; i++) {
		if (i == curPage) {
			pageBar += "<a class='aaas' href='javascript:fromtable(" + i
					+ ")'>" + i + "</a>";
		} else {
			pageBar += "<a class='aaas' href='javascript:fromtable(" + i
					+ ")'>" + i + "</a>";
		}
	}
	// 如果不是最后页
	if (curPage != totalPage) {
		pageBar += "<span class='pageBtn' style='padding:0 5px;'><a href='javascript:fromtable("
				+ (curPage + 1)
				+ ")' class='fyBox iconfont icon-jiantou34' ></a></span>";
		// pageBar += "<span class='pageBtn' style='padding:0 15px;'><a
		// href='javascript:fromtable(" +
		// totalPage + ")'>尾页</a></span>";

	}
	// pageBar += "<span class='pageBtn' style='margin-right:20px;'>当前页是 第:<span
	// style='color:#0b9ad6'>" + curPage + "</span>页</span>";
	// pageBar += "<span class='pageBtn'>总共:" + totalPage + "页</span>";
	$("#pageBar").html(pageBar);
	if (curPage < 5) {
		$('.aaas').eq(curPage - 1).addClass('ase');
	} else {
		curPage = 1;
		curPage++;
		$('.aaas').eq(curPage).addClass('ase');
	}

}
$("#mffb").click(function(){
	if($.cookie("uid") == undefined ){
		alert("请登录!");
		window.location.href="register.html";
	}else{
		window.location.href='issue.html';
	}
	
});

//格式化日期
function fromdata(date){
	 var date = new Date(date);
	 return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+ date.getMinutes()+":"+date.getSeconds();  
}

// 页面加载时初始化分页
$(function() {
	dasdsa();
	fromtable(1);
});

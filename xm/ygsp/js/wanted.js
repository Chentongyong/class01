$("#header").load("header.html");
$("#tabbar").load("tabbar.html");

var curPage; //当前页数
var totalItem; //总记录数
var pageSize; //每一页记录数
var totalPage; //总页数
var list;
var url;
var rows = 10;
var city = null;
var hys = ''; //行业类型
var qys; //区域
var mjs = '不限'; //面积
var zjs = '不限'; //租金
var mj = ""; //面积最小值
var mjj = ""; //面积最大值
var zj = ""; //租金最小值
var zjj = ""; //租金最大值
var cs;
var data;
city = $.cookie("myCity"); //城市
$.ajax({ //城市获取区域
	url: "http://192.168.3.5/sun/drcon/citi?citi=" + city,
	type: 'post',
	data: '',
	async: false,
	dataType: 'json',
	success: function(res) {
		var quyu = document.getElementById("quyu");
		for(var i = 0; i < res.length; i++) {
			var liObj = document.createElement('li');
			liObj.innerHTML += res[i].text;
			quyu.appendChild(liObj);
		}
	},
	error: function() {
		alert('网络出错了')
	}
})

$('.hangye li').click(function() { //行业
	$(this).addClass('col').siblings('li').removeClass('col');
	hys = $(this).text();
	if(hys=='不限'){
		hys= '';
	}
	fromtable(1);
})

$('.quyu li').click(function() { //区域
	$(this).addClass('col').siblings('li').removeClass('col');
	qys = $(this).text();
	if(qys=='不限'){
		cs= city
	}else{
		cs = city + qys;
	}
	
	fromtable(1);
})

$('.pingfang li').click(function() { //面积
	$(this).addClass('col').siblings('li').removeClass('col');
	mjs = $(this).text();
	fadskghfdsakjhg(mjs);
	fromtable(1);
})

$('.zujing li').click(function() { //租金
	$(this).addClass('col').siblings('li').removeClass('col');
	zjs = $(this).text();
	dsabhgkdfa(zjs);
	fromtable(1);
})

function fadskghfdsakjhg(mjt) { //面积
	switch(mjt) {
		case "不限":
			mj = "";
			mjj = "";
			break;
		case "20m²一下":
			mj = 20;
			mjj = "";
			break;
		case "20m²-50m²":
			mj = 20;
			mjj = 50;
			break;
		case "50m²-100m²":
			mj = 50;
			mjj = 100;
			break;
		case "100m²-200m²":
			mj = 100;
			mjj = 200;
			break;
		case "200m²-500m²":
			mj = 200;
			mjj = 500;
			break;
		case "500m²以上":
			mj = "";
			mjj = 500;
			break;
	}
}
// 租金
function dsabhgkdfa(zjt) {
	switch(zjt) {
		case "不限":
			zj = "";
			zjj = "";
			break;
		case "2千元以下":
			zj = 2000;
			zjj = "";
			break;
		case "2-5千元":
			zj = 2000;
			zjj = 5000;
			break;
		case "5千-1万元":
			zj = 5000;
			zjj = 10000;
			break;
		case "1-2万元":
			zj = 10000;
			zjj = 20000;
			break;
		case "2-5万元":
			zj = 20000;
			zjj = 50000;
			break;
		case "5万元以上":
			zzx = "";
			zjj = 50000;
			break;
	}
}


function fromtable(page) {
	data = {
		'qy': cs,
		'jyyt': hys,
		'zj': zj,
		'zjj': zjj,
		'mj': mj,
		'mjj': mjj
	}
//	var start = $("#start").val();
//	var end = $("#end").val();
	url = "http://192.168.3.5/sun/site/pcPage?start=" + page + "&number=" + rows;
	$.ajax({
		type: "post",
		url: url,
		data:data,
		success: function(data) {
			$("#tbdy").empty(); //清空子元素
			if(data != null) {
				list = data.rows;
				if(list.length > 0) {
					totalItem = data.total;
				} else {
					totalItem = 0;
				}
				document.getElementById('tm').innerText = data.total;
				pageSize = rows;
				curPage = page;
				totalPage = Math.ceil(totalItem / rows);
				var html = [];
				for(var i = 0; i < list.length; i++) {
					html += "<li>";
					// html += "<span><b>" + list[i].starttime + "</b></span>";
					html += '<a title="' + list[i].siteid + '" href="wan_details.html?sid=' + list[i].siteid + '"><div class="le_details"><h4>' +
						list[i].name + '</h4><div class="le_deZi"><div>租金预算：<span class="zjys">'+ 
						list[i].zj +'</span>元</div><div>面积：<span>'+ 
						list[i].mj +'</span>平米</div><div>经营业态：<span>'+ 
						list[i].jyyt +'</span></div></div><div class="le_deZi"><div>更新时间：<span>'+ 
						fromdata(list[i].xzdate) +'</span></div><div>区域：<span>'+ 
						list[i].qy +'</span></div></div></div></a>';
					html += "</li>";
				}
				$('#tbdy').html(html);
			}
		},
		complete: function() { //添加分页按钮栏
			getPageBar();
		},
		error: function() {}

	});

}

//获取分页条（分页按钮栏的规则和样式根据自己的需要来设置）
function getPageBar() {
	if(curPage > totalPage) {
		curPage = totalPage;
	}
	if(curPage < 1) {
		curPage = 1;
	}
	pageBar = "";
	//如果不是第一页
	//		if(curPage != 1) {
	//			pageBar += "<span class='pageBtn' style='padding:0 5px;'><a href='javascript:fromtable(1);'>首页</a></span>";
	pageBar += "<span class='pageBtn' style='padding:0 15px'><a href='javascript:fromtable(" +
		(curPage - 1) + ")' class='fyBox iconfont icon-anniu' ></a></span>";
	//		}
	//显示的页码按钮(5个)
	var start, end;
	if(totalPage <= 5) {
		start = 1;
		end = totalPage;
	} else {
		if(curPage - 2 <= 0) {
			start = 1;
			end = 5;
		} else {
			if(totalPage - curPage < 2) {
				start = totalPage - 4;
				end = totalPage;
			} else {
				start = curPage - 2;
				end = curPage + 2;
			}
		}
	}
	for(var i = start; i <= end; i++) {
		if(i == curPage) {
			pageBar += "<a class='aaas' href='javascript:fromtable(" +
				i + ")'>" + i + "</a>";
		} else {
			pageBar += "<a class='aaas' href='javascript:fromtable(" +
				i + ")'>" + i + "</a>";
		}
	}
	//如果不是最后页
	if(curPage != totalPage) {
		pageBar += "<span class='pageBtn' style='padding:0 5px;'><a href='javascript:fromtable(" +
			(curPage + 1) + ")' class='fyBox iconfont icon-anniu-copy-copy' ></a></span>";
		//			pageBar += "<span class='pageBtn' style='padding:0 15px;'><a href='javascript:fromtable(" +
		//				totalPage + ")'>尾页</a></span>";

	}
	//		pageBar += "<span class='pageBtn' style='margin-right:20px;'>当前页是   第:<span style='color:#0b9ad6'>" + curPage + "</span>页</span>";
	//		pageBar += "<span class='pageBtn'>总共:" + totalPage + "页</span>"; 
	$("#pageBar").html(pageBar);
	if(curPage < 4) {
		$('.aaas').eq(curPage - 1).addClass('ase');
	} else {
		curPage = 1;
		curPage++;
		$('.aaas').eq(curPage).addClass('ase');
	}

}

//页面加载时初始化分页
$(function() {
	fromtable(1);
});

//格式化日期
function fromdata(date){
	 var date = new Date(date);
	 return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+ date.getMinutes()+":"+date.getSeconds();  

}
//创建时间格式化显示

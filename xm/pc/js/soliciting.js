
var curPage; //当前页数
var totalItem; //总记录数
var pageSize; //每一页记录数
var totalPage; //总页数
var list;
var url;
var rows = 10;
var region = '';
var type = '';
var acreage = '';
var addreaa = '';
var hangye = $("#hangye").text();
var purchaseBudget = '';
var yuan = '';
var txt1;
var txt2;
var city;
var spid;

//soliciting.html     ll显示市下面的区
function quyu(){
	if($.cookie("my_city") == undefined){
		city='北京市';
	}else{
		city = $.cookie("my_city");
	}
	
	data9 = {"store.city": city};//,"shopPurchase.region":""
	$.ajax({
		url: "../cityaction!main.action",
		type: 'post',
		async:false, //不是异步处理
		data: data9,
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
			alert("网络不给力，请查看网络");
		}
	});
	$('.quyu li').click(function() {//区域
		$(this).addClass('col').siblings('li').removeClass('col');
		var region1 = $(this).text();
		if(region1 == "不限"){
			region = city;
		}else{
			region = city + region1.replace("区","");
		}
		fromtable(1);
	})
	
}

$('.hangye li').click(function() { //行业
	$(this).addClass('col').siblings('li').removeClass('col');
	type = $(this).text();
	if(type == "不限"){
		type = undefined;
	}
	fromtable(1);
})

function shaixuan1() {//面积筛选
	txt1 = $("#txt1").val();
	txt2 = $("#txt2").val();
	if(txt1 != null && txt1 != "" && txt2 != null && txt2 != ""){
		acreage = txt1;
		addreaa = txt2;
		fromtable(1);
	}else{
		alert("请将面积输入框填写完整");
	}
	
}
function shaixuan2() {//面积筛选
	txt3 = $("#txt3").val();
	txt4 = $("#txt4").val();
	if(txt3 != null && txt3 != "" && txt4 != null && txt4 != ""){
		purchaseBudget = txt3;
		yuan = txt4;
		fromtable(1);
	}else{
		alert("请将租金输入框填写完整");
	}
	
}

$('.pingfang li').click(function() {//面积
	$(this).addClass('col').siblings('li').removeClass('col');
	var acreage1 = $(this).text();
	if(acreage1 == "不限"){
		acreage = undefined;
		addreaa = undefined;
		fromtable(1);
	}else if(acreage1 == "20m²以下"){
		acreage = 20;
		addreaa = undefined;
		fromtable(1);
	}else if(acreage1 == "20m²-50m²"){
		acreage = 20;
		addreaa = 50;
		fromtable(1);
	}else if(acreage1 == "50m²-100m²"){
		acreage = 50;
		addreaa = 100;
		fromtable(1);
	}else if(acreage1 == "100m²-200m²"){
		acreage = 100;
		addreaa = 200;
		fromtable(1);
	}else if(acreage1 == "200m²-500m²"){
		acreage = 200;
		addreaa = 500;
		fromtable(1);
	}else if(acreage1 == "500m²以上"){
		acreage = undefined;
		addreaa = 500;
		fromtable(1);
	}
	/*if(acreage1 != "20m²以下"){
		if(acreage1 == "500m²以上"){
			addreaa = acreage1.match(/(\S*)m²/)[1];//截取字符
			fromtable(1);
		}else if(acreage1 == "不限"){
			acreage = null;
			addreaa = null;
			fromtable(1);
		}else{
			acreage = acreage1.match(/(\S*)m²-/)[1];
			fromtable(1);
		}
	}else{
		acreage = acreage1.match(/(\S*)m²/)[1];
		addreaa = null;
		fromtable(1);
	}
	
	var addreaa1 = $(this).text();
	if(addreaa1 != "500m²以上"){
		if(addreaa1 == "20m²以下"){
			fromtable(1);
		}else if(acreage1 == "不限"){
			acreage = null;
			addreaa = null;
			fromtable(1);
		}else{
			addreaa = addreaa1.match(/m²-(\S*)m²/)[1];
			fromtable(1);
		}
	}*/
})

$('.zujing li').click(function() {//租金
	$(this).addClass('col').siblings('li').removeClass('col');
	var purchaseBudget1 = $(this).text();
	if(purchaseBudget1 == "不限"){
		purchaseBudget = undefined;
		yuan = undefined;
		fromtable(1);
	}else if(purchaseBudget1 == "2千元以下"){
		purchaseBudget = 2000;
		yuan = undefined;
		fromtable(1);
	}else if(purchaseBudget1 == "2-5千元"){
		purchaseBudget = 2000;
		yuan = 5000;
		fromtable(1);
	}else if(purchaseBudget1 == "5千-1万元"){
		purchaseBudget = 5000;
		yuan = 10000;
		fromtable(1);
	}else if(purchaseBudget1 == "1-2万元"){
		purchaseBudget = 10000;
		yuan = 20000;
		fromtable(1);
	}else if(purchaseBudget1 == "2-5万元"){
		purchaseBudget = 20000;
		yuan = 50000;
		fromtable(1);
	}else if(purchaseBudget1 == "5万元以上"){
		purchaseBudget = undefined;
		yuan = 50000;
		fromtable(1);
	}
	
})

function fromtable(page) {
	/*var start = $("#start").val();
	var end = $("#end").val();*/
	if(region != ""){
		if(type == "" && acreage == "" && addreaa == "" && purchaseBudget == "" && yuan == ""){
			data = {"shopPurchase.region":region,"page": page,"rows": rows};
		}else if(type != ""  && acreage == "" && addreaa == "" && purchaseBudget == "" && yuan == ""){
			data = {"shopPurchase.region":region,"shopPurchase.type": type,"page": page,"rows": rows};
		}else if(type != ""  && acreage != "" && addreaa == "" && purchaseBudget == "" && yuan == ""){
			data = {"shopPurchase.region":region,"shopPurchase.type": type,"shopPurchase.acreage": acreage,"page": page,"rows": rows};
		}else if(type != ""  && acreage == "" && addreaa != "" && purchaseBudget == "" && yuan == ""){
			data = {"shopPurchase.region":region,"shopPurchase.type": type,"shopPurchase.addreaa": addreaa,"page": page,"rows": rows};
		}else if(type != ""  && acreage != "" && addreaa != "" && purchaseBudget == "" && yuan == ""){
			data = {"shopPurchase.region":region,"shopPurchase.type": type,"shopPurchase.acreage": acreage,"shopPurchase.addreaa": addreaa,"page": page,"rows": rows};
		}else if(type != ""  && acreage != "" && addreaa != "" && purchaseBudget != "" && yuan == ""){
			data = {"shopPurchase.region":region,"shopPurchase.type": type,"shopPurchase.acreage": acreage,"shopPurchase.addreaa": addreaa,"shopPurchase.purchaseBudget": purchaseBudget,"page": page,"rows": rows};
		}else if(type != ""  && acreage != "" && addreaa != "" && purchaseBudget == "" && yuan != ""){
			data = {"shopPurchase.region":region,"shopPurchase.type": type,"shopPurchase.acreage": acreage,"shopPurchase.addreaa": addreaa,"shopPurchase.yuan": yuan,"page": page,"rows": rows};
		}else if(type != ""  && acreage != "" && addreaa != "" && purchaseBudget != "" && yuan != ""){
			data = {"shopPurchase.region":region,"shopPurchase.type": type,"shopPurchase.acreage": acreage,"shopPurchase.addreaa": addreaa,"shopPurchase.purchaseBudget": purchaseBudget,"shopPurchase.yuan": yuan,"page": page,"rows": rows};
		}else if(type == ""  && acreage != "" && addreaa == "" && purchaseBudget == "" && yuan == ""){
			data = {"shopPurchase.region":region,"shopPurchase.acreage": acreage,"page": page,"rows": rows};
		}else if(type == ""  && acreage == "" && addreaa != "" && purchaseBudget == "" && yuan == ""){
			data = {"shopPurchase.region":region,"shopPurchase.addreaa": addreaa,"page": page,"rows": rows};
		}else if(type == ""  && acreage != "" && addreaa != "" && purchaseBudget == "" && yuan == ""){
			data = {"shopPurchase.region":region,"shopPurchase.acreage": acreage,"shopPurchase.addreaa": addreaa,"page": page,"rows": rows};
		}else if(type == ""  && acreage != "" && addreaa == "" && purchaseBudget != "" && yuan == ""){
			data = {"shopPurchase.region":region,"shopPurchase.acreage": acreage,"shopPurchase.purchaseBudget": purchaseBudget,"page": page,"rows": rows};
		}else if(type == ""  && acreage != "" && addreaa == "" && purchaseBudget == "" && yuan != ""){
			data = {"shopPurchase.region":region,"shopPurchase.acreage": acreage,"shopPurchase.yuan": yuan,"page": page,"rows": rows};
		}else if(type == ""  && acreage == "" && addreaa != "" && purchaseBudget != "" && yuan == ""){
			data = {"shopPurchase.region":region,"shopPurchase.purchaseBudget": purchaseBudget,"shopPurchase.addreaa": addreaa,"page": page,"rows": rows};
		}else if(type == ""  && acreage == "" && addreaa != "" && purchaseBudget == "" && yuan != ""){
			data = {"shopPurchase.region":region,"shopPurchase.yuan": yuan,"shopPurchase.addreaa": addreaa,"page": page,"rows": rows};
		}else if(type == ""  && acreage == "" && addreaa != "" && purchaseBudget != "" && yuan != ""){
			data = {"shopPurchase.region":region,"shopPurchase.purchaseBudget": purchaseBudget,"shopPurchase.addreaa": addreaa,"shopPurchase.yuan": yuan,"page": page,"rows": rows};
		}else if(type == ""  && acreage == "" && addreaa == "" && purchaseBudget != "" && yuan == ""){
			data = {"shopPurchase.region":region,"shopPurchase.purchaseBudget": purchaseBudget,"page": page,"rows": rows};
		}else if(type == ""  && acreage == "" && addreaa == "" && purchaseBudget == "" && yuan != ""){
			data = {"shopPurchase.region":region,"shopPurchase.yuan": yuan,"page": page,"rows": rows};
		}else if(type == ""  && acreage == "" && addreaa == "" && purchaseBudget != "" && yuan != ""){
			data = {"shopPurchase.region":region,"shopPurchase.purchaseBudget": purchaseBudget,"shopPurchase.yuan": yuan,"page": page,"rows": rows};
		}else if(type == ""  && acreage != "" && addreaa != "" && purchaseBudget != "" && yuan == ""){
			data = {"shopPurchase.region":region,"shopPurchase.acreage": acreage,"shopPurchase.addreaa": addreaa,"shopPurchase.purchaseBudget": purchaseBudget,"page": page,"rows": rows};
		}else if(type == ""  && acreage != "" && addreaa != "" && purchaseBudget == "" && yuan != ""){
			data = {"shopPurchase.region":region,"shopPurchase.acreage": acreage,"shopPurchase.addreaa": addreaa,"shopPurchase.yuan": yuan,"page": page,"rows": rows};
		}else if(type == ""  && acreage != "" && addreaa != "" && purchaseBudget != "" && yuan != ""){
			data = {"shopPurchase.region":region,"shopPurchase.acreage": acreage,"shopPurchase.addreaa": addreaa,"shopPurchase.purchaseBudget": purchaseBudget,"shopPurchase.yuan": yuan,"page": page,"rows": rows};
		}
	}else{
		if(type == "" && acreage == "" && addreaa == "" && purchaseBudget == "" && yuan == ""){
			data = {"shopPurchase.region":city,"page": page,"rows": rows};
		}else if(type != ""  && acreage == "" && addreaa == "" && purchaseBudget == "" && yuan == ""){
			data = {"shopPurchase.region":city,"shopPurchase.type": type,"page": page,"rows": rows};
		}else if(type != ""  && acreage != "" && addreaa == "" && purchaseBudget == "" && yuan == ""){
			data = {"shopPurchase.region":city,"shopPurchase.type": type,"shopPurchase.acreage": acreage,"page": page,"rows": rows};
		}else if(type != ""  && acreage == "" && addreaa != "" && purchaseBudget == "" && yuan == ""){
			data = {"shopPurchase.region":city,"shopPurchase.type": type,"shopPurchase.addreaa": addreaa,"page": page,"rows": rows};
		}else if(type != ""  && acreage != "" && addreaa != "" && purchaseBudget == "" && yuan == ""){
			data = {"shopPurchase.region":city,"shopPurchase.type": type,"shopPurchase.acreage": acreage,"shopPurchase.addreaa": addreaa,"page": page,"rows": rows};
		}else if(type != ""  && acreage != "" && addreaa != "" && purchaseBudget != "" && yuan == ""){
			data = {"shopPurchase.region":city,"shopPurchase.type": type,"shopPurchase.acreage": acreage,"shopPurchase.addreaa": addreaa,"shopPurchase.purchaseBudget": purchaseBudget,"page": page,"rows": rows};
		}else if(type != ""  && acreage != "" && addreaa != "" && purchaseBudget == "" && yuan != ""){
			data = {"shopPurchase.region":city,"shopPurchase.type": type,"shopPurchase.acreage": acreage,"shopPurchase.addreaa": addreaa,"shopPurchase.yuan": yuan,"page": page,"rows": rows};
		}else if(type != ""  && acreage != "" && addreaa != "" && purchaseBudget != "" && yuan != ""){
			data = {"shopPurchase.region":city,"shopPurchase.type": type,"shopPurchase.acreage": acreage,"shopPurchase.addreaa": addreaa,"shopPurchase.purchaseBudget": purchaseBudget,"shopPurchase.yuan": yuan,"page": page,"rows": rows};
		}else if(type == ""  && acreage != "" && addreaa == "" && purchaseBudget == "" && yuan == ""){
			data = {"shopPurchase.region":city,"shopPurchase.acreage": acreage,"page": page,"rows": rows};
		}else if(type == ""  && acreage == "" && addreaa != "" && purchaseBudget == "" && yuan == ""){
			data = {"shopPurchase.region":city,"shopPurchase.addreaa": addreaa,"page": page,"rows": rows};
		}else if(type == ""  && acreage != "" && addreaa != "" && purchaseBudget == "" && yuan == ""){
			data = {"shopPurchase.region":city,"shopPurchase.acreage": acreage,"shopPurchase.addreaa": addreaa,"page": page,"rows": rows};
		}else if(type == ""  && acreage != "" && addreaa == "" && purchaseBudget != "" && yuan == ""){
			data = {"shopPurchase.region":city,"shopPurchase.acreage": acreage,"shopPurchase.purchaseBudget": purchaseBudget,"page": page,"rows": rows};
		}else if(type == ""  && acreage != "" && addreaa == "" && purchaseBudget == "" && yuan != ""){
			data = {"shopPurchase.region":city,"shopPurchase.acreage": acreage,"shopPurchase.yuan": yuan,"page": page,"rows": rows};
		}else if(type == ""  && acreage == "" && addreaa != "" && purchaseBudget != "" && yuan == ""){
			data = {"shopPurchase.region":city,"shopPurchase.purchaseBudget": purchaseBudget,"shopPurchase.addreaa": addreaa,"page": page,"rows": rows};
		}else if(type == ""  && acreage == "" && addreaa != "" && purchaseBudget == "" && yuan != ""){
			data = {"shopPurchase.region":city,"shopPurchase.yuan": yuan,"shopPurchase.addreaa": addreaa,"page": page,"rows": rows};
		}else if(type == ""  && acreage == "" && addreaa != "" && purchaseBudget != "" && yuan != ""){
			data = {"shopPurchase.region":city,"shopPurchase.purchaseBudget": purchaseBudget,"shopPurchase.addreaa": addreaa,"shopPurchase.yuan": yuan,"page": page,"rows": rows};
		}else if(type == ""  && acreage == "" && addreaa == "" && purchaseBudget != "" && yuan == ""){
			data = {"shopPurchase.region":city,"shopPurchase.purchaseBudget": purchaseBudget,"page": page,"rows": rows};
		}else if(type == ""  && acreage == "" && addreaa == "" && purchaseBudget == "" && yuan != ""){
			data = {"shopPurchase.region":city,"shopPurchase.yuan": yuan,"page": page,"rows": rows};
		}else if(type == ""  && acreage == "" && addreaa == "" && purchaseBudget != "" && yuan != ""){
			data = {"shopPurchase.region":city,"shopPurchase.purchaseBudget": purchaseBudget,"shopPurchase.yuan": yuan,"page": page,"rows": rows};
		}else if(type == ""  && acreage != "" && addreaa != "" && purchaseBudget != "" && yuan == ""){
			data = {"shopPurchase.region":city,"shopPurchase.acreage": acreage,"shopPurchase.addreaa": addreaa,"shopPurchase.purchaseBudget": purchaseBudget,"page": page,"rows": rows};
		}else if(type == ""  && acreage != "" && addreaa != "" && purchaseBudget == "" && yuan != ""){
			data = {"shopPurchase.region":city,"shopPurchase.acreage": acreage,"shopPurchase.addreaa": addreaa,"shopPurchase.yuan": yuan,"page": page,"rows": rows};
		}else if(type == ""  && acreage != "" && addreaa != "" && purchaseBudget != "" && yuan != ""){
			data = {"shopPurchase.region":city,"shopPurchase.acreage": acreage,"shopPurchase.addreaa": addreaa,"shopPurchase.purchaseBudget": purchaseBudget,"shopPurchase.yuan": yuan,"page": page,"rows": rows};
		}
		
	}
	
	$.ajax({
		type: "post",
		url: "../spapp!pcqiuzu.action",
		data: data,
		success: function(data) {
			$("#tbdy").empty(); //清空子元素
			if(data != null) {
				list = JSON.parse(data);
				if(list.length > 0) {
					totalItem = list[0].ext;
				} else {
					totalItem = 0;
				}
				pageSize = rows;
				curPage = page;
				totalPage = Math.ceil(totalItem / rows);
				var html = [];
				for(var i = 0; i < list.length; i++) {
					html += "<li>";
					if(list[i].purchaseBudget == ""){
						purchaseBudget = 0;
					}
					html += '<a id="'+list[i].spid+'"><div class="le_details">'
						+'<h5 id="title">'+list[i].title+'</h5><div><span>'+list[i].type+'</span><span>'+list[i].acreage+'m²</span>'
						+'<span class="post_right1"><b>'+purchaseBudget+'</b>元/月</span>'
						+'</div><div><span>'+list[i].region+'</span></div></div></a>';
						
					html += "</li>";
					
				}
				$('#tbdy').html(html);
			}
			$('a').click(function(){
				spid = $(this).attr("id");//jquery获取spid
				window.location.href='soli_details.html?spid='+spid;//将spid跟随href传给soli_details.html页面
			})
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
		(curPage - 1) + ")' class='fyBox iconfont icon-jiantou33' ></a></span>";
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
			(curPage + 1) + ")' class='fyBox iconfont icon-jiantou34' ></a></span>";
		//			pageBar += "<span class='pageBtn' style='padding:0 15px;'><a href='javascript:fromtable(" +
		//				totalPage + ")'>尾页</a></span>";

	}
	//		pageBar += "<span class='pageBtn' style='margin-right:20px;'>当前页是   第:<span style='color:#0b9ad6'>" + curPage + "</span>页</span>";
	//		pageBar += "<span class='pageBtn'>总共:" + totalPage + "页</span>"; 
	$("#pageBar").html(pageBar);
	if(curPage < 5) {
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

//soliciting.html      ll查询所有商铺求租
$('#shangpuqiuzu').click(function(){
	//点击事件暂时不用
});
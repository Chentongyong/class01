	
	var sid;
	var uid;
	var spid;
	var sc = document.getElementsByClassName('r_sc');
	$("#header").load("header.html");
	$('#base').load('base.html');

	$('.mineLeft a').click(function() {
		$(this).addClass('aStyle').siblings('a').removeClass('aStyle');
	})

	$('.tcdl').click(function() { //点击退出登录
		$('#denglu').css('display', 'block')
	})
	$('.zzc').click(function() { //
		$('#denglu').css('display', 'none')
	})

	$('.myIssue span').click(function(){//转租找店
		if($(this).attr('class')!='span_color'){
			$(this).addClass('span_color').siblings('span').removeClass('span_color')
		}
		if($(this).text()=='转租'){
			fromtable();
		}else{
			my_fabu();
		}
	})

	var curPage; //当前页数
	var totalItem; //总记录数
	var pageSize; //每一页记录数
	var totalPage; //总页数
	var list;
	var url;
	var rows = 10;

	function fromtable() {//page
		uid = $.cookie("uid");
		$.ajax({
			url: "../storeactions!MyStore.action?user.uid="+uid,//?page=  + page + "&rows=" + rows
			type: "post",
			/*data: data2,*/
			success: function(data) {
				$("#tbdy").empty(); //清空子元素
				if(data != null) {
					list = JSON.parse(data);
					/*if(list.length > 0) {
						totalItem = list[0].ext;
					} else {
						totalItem = 0;
					}
					pageSize = rows;
					curPage = page;
					totalPage = Math.ceil(totalItem / rows);*/
					var html = [];
					for(var i = 0; i < list.length; i++) {
						html += "<li>";
						html += '<a><h4 id="'+list[i].sid+'">'+list[i].name+'</h4><div class="myIs1">商铺类型：<span>'+list[i].shoptype+'</span>' +
							'</div><div class="myIs1">地址：<span>'+list[i].address+'</span></div><div class="myIs1">' +
							'<span>月租金：<b>'+list[i].price+'</b>万/月</span><span class="myIs_sp">转让费：<b>面议</b></span></div></a>' +
							'<div class="myIs_amend"><p id="'+list[i].sid+'">删除</p><a id="'+list[i].sid+'">修改信息</a></div>';
						html += "</li>";
					
					}
					$('#tbdy').html(html);
				}
				
				$('h4').click(function(){
					sid = $(this).attr("id");//jquery获取spid
					alert(sid)
					window.location.href='rent_details.html?sid='+sid;//将spid跟随href传给soli_details.html页面
				})
				
				//删除个人转让信息
				$(".myIs_amend p").click(function(){
					sid = $(this).attr("id");
					data1 = {"store.sid": sid};
					$.ajax({
						url: "../storeactions!my_delete.action",
						type: 'post',
						data:  data1,
						dataType: 'json',
						success: function(data) {
							window.location.href='source.html';
						},
						error: function(xhr, type, errorThrown) {
							alert("删除失败");
						}
					});
				});
				
				//修改个人转让信息
				$(".myIs_amend a").click(function(){
					sid = $(this).attr("id");//jquery获取spid
					window.location.href='rent_issue.html?sid='+sid;
				});
			},
			/*complete: function() { //添加分页按钮栏
				getPageBar();
			},*/
			error: function() {}

		});

	}
	
	//我发布的找店资源
	function my_fabu() {//page
		uid = $.cookie("uid");
		$.ajax({
			url: "../spapp!queryword.action?u.uid="+uid,//?page=  + page + "&rows=" + rows
			type: "post",
			success: function(data) {
				$("#tbdy").empty(); //清空子元素
				if(data != null) {
					list = JSON.parse(data);
					/*if(list.length > 0) {
						totalItem = list[0].ext;
					} else {
						totalItem = 0;
					}
					pageSize = rows;
					curPage = page;
					totalPage = Math.ceil(totalItem / rows);*/
					var html = [];
					for(var i = 0; i < list.length; i++) {
						if(list[i].purchaseBudget == ""){
							purchaseBudget = 0;
						}else{
							purchaseBudget = list[i].purchaseBudget;
						}
						html += "<li>";
						html += '<a><h4 id="'+list[i].spid+'">'+list[i].title+'</h4><div class="myIs1">商铺类型：<span>'+list[i].type+'</span>' +
						'</div><div class="myIs1">地址：<span>'+list[i].region+'</span></div><div class="myIs1">' +
						'<span>月租金：<b>'+purchaseBudget+'</b>万/月</span><span class="myIs_sp">转让费：<b>面议</b></span></div></a>' +
						'<div class="myIs_amend"><p id="'+list[i].spid+'">删除</p><a id="'+list[i].spid+'">修改信息</a></div>';
						html += "</li>";
					
					}
					$('#tbdy').html(html);//href="soli_issue.html"
				}
				
				$('h4').click(function(){
					spid = $(this).attr("id");//jquery获取spid
					window.location.href='soli_details.html?spid='+spid;//将spid跟随href传给soli_details.html页面
				})
				
				//删除个人转让信息
				$(".myIs_amend p").click(function(){
					spid = $(this).attr("id");//jquery获取spid
					data2 = {"shopPurchase.spid": spid};
					$.ajax({
						url: "../spapp!my_delete.action",
						type: 'post',
						data:  data2,
						dataType: 'json',
						success: function(data) {
							window.location.href='source.html';
						},
						error: function(xhr, type, errorThrown) {
							alert("删除失败");
						}
					});
				});
				
				//修改个人转让信息
				$(".myIs_amend a").click(function(){
					spid = $(this).attr("id");//jquery获取spid
					window.location.href='soli_issue.html?spid='+spid;
				});
			},
			/*complete: function() { //添加分页按钮栏
				getPageBar();
			},*/
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
		if(curPage<5){
			$('.aaas').eq(curPage-1).addClass('ase');
		}else{
			curPage = 1;
			curPage++;
			$('.aaas').eq(curPage).addClass('ase');
		}

	}

	//页面加载时初始化分页
	$(function() {
		fromtable();//1
	});
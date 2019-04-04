var sc = document.getElementsByClassName('r_sc');
	$("#header").load("../header.html");
	$('#base').load('../base.html');

	$('.mineLeft a').click(function() {
		$(this).addClass('aStyle').siblings('a').removeClass('aStyle');
	})

	$('.tcdl').click(function() { //点击退出登录
		$('#denglu').css('display', 'block')
	})
	$('.zzc').click(function() { //
		$('#denglu').css('display', 'none')
	})
	var shi;//市
	$(document).ready(function() {
		shi = $.cookie("my_city");
		if (shi == undefined) {
			shi = "北京市";
		}
	})

	function qiuzu_quyu() {
		data9 = {
			"store.city" : shi
		};
		$.ajax({
			url : "../cityaction!main.action",
			type : 'post',
			async : false, //不是异步处理
			data : data9,
			dataType : 'json',
			success : function(data) {
				var region1 = document.getElementById("region1");
				for (var i = 0; i < data.length; i++) {
					var option = document.createElement('option'); //创建元素节点
					option.innerHTML += data[i].text;
					region1.appendChild(option);
				}
			},
			error : function(xhr, type, errorThrown) {
				alert("网络不给力，请查看网络");
			}
		});
	}

	var curPage; //当前页数
	var totalItem; //总记录数
	var pageSize; //每一页记录数
	var totalPage; //总页数
	var list;
	var url;
	var rows = 10;
	var date;
	function fromtable(page) {
		console.log(1);
		date = {
			"store.shoptype" : $("#shoptype").val(),
			"store.address" :shi+ $("#region1").val(),
			"store.typead" : $("#typead").val(),
			"store.square" : $("#square").val(),
			"store.price" : $("#price").val(),
		}
		url = "../storeactions!jzcxall.action?page=" + page + "&rows=" + rows;
		$.ajax({
					type : "post",
					url : url,
					data : date,
					success : function(data) {
						$("#tbdy").empty(); //清空子元素
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
							if (totalPage > 0) {

								for (var i = 0; i < list.length; i++) {
									html += "<li>";
									html += '<a><img src="'+list[i].img+'" />'
											+ '<div class="riBox"><h4>'
											+ list[i].name
											+ '</h4><div class="r_subset">'
											+ '<span>面积：<b>'
											+ list[i].square
											+ '</b> 平方</span></div><div class="r_subset"><span>租金：<b>'
											+ list[i].price
											+ '</b></span></div><div class="r_subset"><span>区域：</span><span>'
											+ list[i].address
											+ '</span></div><div class="r_subset"><span>地址：</span><span>'
											+ list[i].detailedaddress
											+ '</span></div><div class="r_subset"><span><span>'
											+ fromdata(list[i].sdate)
											+ '</span> 更新</span></div></div></a>';
									html += "</li>";
								}
								$('#tbdy').html(html);
							}
						}
					},
					complete : function() { //添加分页按钮栏
						getPageBar();
					},
					error : function() {
					}

				});

	}

	//获取分页条（分页按钮栏的规则和样式根据自己的需要来设置）
	function getPageBar() {
		if (curPage > totalPage) {
			curPage = totalPage;
		}
		if (curPage < 1) {
			curPage = 1;
		}
		pageBar = "";
		//如果不是第一页
		//		if(curPage != 1) {
		//			pageBar += "<span class='pageBtn' style='padding:0 5px;'><a href='javascript:fromtable(1);'>首页</a></span>";
		pageBar += "<span class='pageBtn' style='padding:0 15px'><a href='javascript:fromtable("
				+ (curPage - 1)
				+ ")' class='fyBox iconfont icon-jiantou33' ></a></span>";
		//		}
		//显示的页码按钮(5个)
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
		//如果不是最后页
		if (curPage != totalPage) {
			pageBar += "<span class='pageBtn' style='padding:0 5px;'><a href='javascript:fromtable("
					+ (curPage + 1)
					+ ")' class='fyBox iconfont icon-jiantou34' ></a></span>";
			//			pageBar += "<span class='pageBtn' style='padding:0 15px;'><a href='javascript:fromtable(" +
			//				totalPage + ")'>尾页</a></span>";

		}
		//		pageBar += "<span class='pageBtn' style='margin-right:20px;'>当前页是   第:<span style='color:#0b9ad6'>" + curPage + "</span>页</span>";
		//		pageBar += "<span class='pageBtn'>总共:" + totalPage + "页</span>";
		$("#pageBar").html(pageBar);
		if (curPage < 5) {
			$('.aaas').eq(curPage - 1).addClass('ase');
		} else {
			curPage = 1;
			curPage++;
			$('.aaas').eq(curPage).addClass('ase');
		}

	}
	//格式化日期
	function fromdata(date){
		 var date = new Date(date);
		 return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+ date.getMinutes()+":"+date.getSeconds();
	}
	//页面加载时初始化分页
	$(function() {
		qiuzu_quyu();
	});

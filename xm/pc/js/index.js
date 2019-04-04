
	var cz;
	var zz;
	var qz;

	$("#header").load("header.html");
	$('#base').load('base.html');

	$('.cen_tab span').click(function() {//出租、转租、求租
		$(this).addClass('span_back').siblings('span').removeClass('span_back');
	})
	$('#cz_cz').click(function() {//出租
		cz = $("#cz_cz").text();
		chuzu_sex();
	})
	$('#zr_zr').click(function() {//转让
		zz = $("#zr_zr").text();
		zhuanzu_sex();
	})
	$('#qz_qz').click(function() {//求租
		qz = $("#qz_qz").text();
		qiuzu_sex();
	})

	var lis = $('#carousel li').length;
	var sum = 0;
	var time = '';
	//为li添加鼠标放上去事件
	$('#carousel li').mousemove(function() {
		sum = $(this).index();
		console.log(sum)
		//siblings 兄弟姐妹
		$(this).addClass('on').siblings('li').removeClass('on');
		//fadeOut 渐渐消失
		//		stop()停止当前动画效果
		$('#carousel a').eq(sum).stop().fadeIn(100).show().siblings('a').fadeOut(100).hide();
	})

	//鼠标放上去显示箭头
	$('.box_up').mouseover(function() {
		clearInterval(time); //清除定时器
		$('.w').show();
	})

	//给箭头添加点击事件
	$('.w').click(function() {
		//判断是那个箭头箭头
		if($(this).attr('class') == 'w w_l') { //左箭头
			sum--;
			if(sum < 0) {
				sum = lis - 1; //下标值是li的长度8 减去 1
			}
			$('#carousel li').eq(sum).addClass('on').siblings('li').removeClass('on'); //添加class名on（让小球背景色变成红色）
			$('#carousel a').eq(sum).show().siblings('a').hide();
		} else { //右箭头
			clock();
		}
	})

	//鼠标离开时箭头消失
	$('.box_up').mouseleave(function() {
		$('.w').hide();
		time = setInterval(function() {
			clock();
		}, 2000);
	})

	//定时器
	time = setInterval(function() {
		clock();
	}, 2000);

	function clock() {
		//		console.log(sum)
		//		console.log(lis)
		sum++;
		if(sum == lis) {
			sum = 0;
		}
		//eq(sum)当前li添加class='on',它的其他兄弟姐妹li删除class='on'
		$('#carousel li').eq(sum).addClass('on').siblings('li').removeClass('on'); //添加class名on（让小球背景色变成红色）
		//eq(sum)当前img添加class='ion',它的其他兄弟姐妹img删除class='ion'
		$('#carousel a').eq(sum).show().siblings('a').hide();
	}
	//
//	$('body').ready(function() {
//	    console.log($.cookie("userName"));
//	    console.log($.cookie("my_city"));
//	});
//var user = JSON.parse(localStorage.getItem("se"));
//console.log(user)
	function tzxq(sid){
		window.location.href="rent_details.html?sid="+sid;
	}
	function chuzu_sex(){
		chuzuPC.innerHTML = '';
		var city = $.cookie('my_city');
		if(undefined==city){
			city="北京市";
		}
		data3 = {"store.address": city,"store.typead": '出租'};
		$.ajax({
			url: "http://192.168.3.5/Store/storeactions!oneToSex.action",
			type: 'post',
			data:  data3,
			dataType: 'json',
			success: function(data) {
				if(data!=null){
					var chuzuPC = document.getElementById("chuzuPC");
					for(var i = 0; i < data.length; i++){
						var li = document.createElement('li');
						li.innerHTML = '<a href="javascript:void(0);" onclick=tzxq("'+data[i].sid+'") ><img src="'+data[i].img+'" /><div class="cen_explain">'+
							'<h5>'+data[i].name+'</h5><p>月租金：<b class="b_style">'+data[i].price+'元</b></p>'+
							'<p>转让费：<span>'+data[i].transferfee+'</span></p><p>面积：<span>'+data[i].square+'m²</span></p></div></a>';
						chuzuPC.appendChild(li);
					}
				}
			},
			error: function(xhr, type, errorThrown) {
//				window.location.href="404.html";
			}
		});
	}

	chuzu_sex();

	function zhuanzu_sex(){
		chuzuPC.innerHTML = '';
		var city = $.cookie('my_city');
		if(undefined==city){
			city="北京市";
		}
		data1 = {"store.address": city,"store.typead": '转让'};
		$.ajax({
			url: "http://192.168.3.5/Store/storeactions!oneToSex.action",
			type: 'post',
			data:  data1,
			dataType: 'json',
			success: function(data) {
				if(data!=null){
					var chuzuPC = document.getElementById("chuzuPC");
					for(var i = 0; i < data.length; i++){
						var li = document.createElement('li');
						li.innerHTML = '<a href="javascript:void(0);" onclick=tzxq("'+data[i].sid+'") ><img src="'+data[i].img+'" /><div class="cen_explain">'+
							'<h5 style="overflow: hidden;text-overflow: ellipsis;white-space:nowrap;">'+data[i].name+'</h5><p>月租金：<b class="b_style">'+data[i].price+'元</b></p>'+
							'<p>转让费：<span>'+data[i].transferfee+'</span></p><p>面积：<span>'+data[i].square+'m²</span></p></div></a>';
						chuzuPC.appendChild(li);
					}
				}
			},
			error: function(xhr, type, errorThrown) {
				window.location.href="404.html";
			}
		});
	}

	function qiuzuxiangqing(spid){
		window.location.href="soli_details.html?spid="+spid;
	}
	function qiuzu_sex(){
		chuzuPC.innerHTML = '';
		var city = $.cookie('my_city');
		if(undefined==city){
			city="北京市";
		}
		data2 = {"shopPurchase.region": city};
		$.ajax({
			url: "http://192.168.3.5/Store/spapp!oneToSex.action",
			type: 'post',
			data:  data2,
			dataType: 'json',
			success: function(data) {
				if(data!=null){
					var chuzuPC = document.getElementById("chuzuPC");
					for(var i = 0; i < data.length; i++){
						var li = document.createElement('li');
						if(data[i].purchaseBudget == ""){
							purchaseBudget = 0;
						}else{
							purchaseBudget = data[i].purchaseBudget;
						}
						da = new Date(data[i].startdate);
						var year = da.getFullYear();
						var month = da.getMonth() + 1;
						var date = da.getDate();
						var dates = [year, month, date].join('.');
						var startdate = dates;
						li.innerHTML = '<a href="javascript:void(0);" onclick=qiuzuxiangqing("'+data[i].spid+'") ><div class="cen_explain">'+
							'<h5>'+data[i].title+'</h5><p>月租金：<b class="b_style">'+purchaseBudget+'元</b></p>'+
							'<p>时间：<span>'+startdate+'</span></p><p>面积：<span>'+data[i].acreage+'m²</span></p></div></a>';
						chuzuPC.appendChild(li);//<img src="'+data[i].img+'" />
					}
				}
			},
			error: function(xhr, type, errorThrown) {
				window.location.href="404.html";
			}
		});
	}
